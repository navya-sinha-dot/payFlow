const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../auth");
const router = express.Router();
const { Account, Transaction } = require("../db");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.json({ balance: account.balance });
  } catch (err) {
    console.error("Balance fetch error:", err);
    res.status(500).json({ message: "Failed to fetch balance" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    if (!amount || amount <= 0 || !to) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid transfer parameters" });
    }

    const senderAccount = await Account.findOne({ userId: req.userId }).session(session);
    const receiverAccount = await Account.findOne({ userId: to }).session(session);

    if (!senderAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Sender account not found" });
    }

    if (!receiverAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Receiver account not found" });
    }

    if (senderAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Record the transaction
    await Transaction.create(
      [
        {
          from: senderAccount.userId,
          to: receiverAccount.userId,
          amount,
          date: new Date(),
        },
      ],
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Transfer successful" });
  } catch (err) {

    //abort the transaction
    await session.abortTransaction();
    session.endSession();
    console.error("Transfer error:", err);
    res.status(500).json({ message: "Transfer failed" });
  }
});

router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ from: req.userId }, { to: req.userId }],
    })
      .populate("from", "firstName lastName email")
      .populate("to", "firstName lastName email")
      .sort({ date: -1 });

    const userTx = transactions.map((tx) => ({
      _id: tx._id,
      from: tx.from,
      to: tx.to,
      amount: tx.amount,
      date: tx.date,
      relativeType: tx.to._id.equals(req.userId) ? "credit" : "debit",
    }));

    res.json({ transactions: userTx });
  } catch (err) {
    console.error("Transaction fetch error:", err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

router.get("/notifications", authMiddleware, async (req, res) => {
  try {
    const creditTx = await Transaction.find({ to: req.userId })
      .populate("from", "firstName lastName email")
      .sort({ date: -1 })
      .limit(10);

    const notifications = creditTx.map((tx) => ({
      _id: tx._id,
      from: `${tx.from.firstName} ${tx.from.lastName}`,
      amount: tx.amount,
      date: tx.date,
      message: `₹${tx.amount} credited from ${tx.from.firstName}`,
    }));

    res.json({ notifications });
  } catch (err) {
    console.error("Notification fetch error:", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

module.exports = router;
