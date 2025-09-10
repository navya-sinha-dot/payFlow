const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const { authMiddleware } = require("../auth");
const bcrypt = require("bcrypt");

const signupBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const success = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    email: req.body.email,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: Math.round((1 + Math.random() * 10000) * 100) / 100,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "user created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const success = signinBody.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Incorrect Input",
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.json({
    message: "error while logging in",
  });
});

const updatedbody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/updateinfo", authMiddleware, async (req, res) => {
  const { success } = updatedbody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating the information",
    });
  }

  const result = await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Update happened successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter;

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Password verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
