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
    maxlength: 10,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
