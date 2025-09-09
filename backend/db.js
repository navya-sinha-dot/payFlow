const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 3,
    maxlength: 20,
    required: true,
  },
  firstName: {
    type: String,
    maxLength: 15,
    required: true,
  },
  lastName: {
    type: String,
    maxLength: 15,
    required: true,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Account,
};
