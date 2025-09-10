const express = require("express");
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
  try {
    const { amount, to } = req.body;

    if (!amount || !to) {
      return res.status(400).json({ message: "Amount and receiver required" });
    }

    const senderAccount = await Account.findOne({ userId: req.userId });
    const receiverAccount = await Account.findOne({ userId: to });

    if (!senderAccount) {
      return res.status(404).json({ message: "Sender account not found" });
    }

    if (!receiverAccount) {
      return res.status(404).json({ message: "Receiver account not found" });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    );

    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    await Transaction.create({
      from: senderAccount.userId,
      to: receiverAccount.userId,
      amount,
      date: new Date(),
    });

    res.json({ message: "Transfer successful" });
  } catch (err) {
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

module.exports = router;
