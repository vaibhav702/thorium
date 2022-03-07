const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    balance: {
      type: Number, // Default balance at user registration is 100
      default: 100,
    },
    address: String,
    age: Number,
    gender: {
      type: String,
      enum: ["Male", "Female", "other"], // Allowed values are - “male”, “female”, “other
    },
    freeAppUser: {
      type: Boolean,
      default: false,     // Default false value.
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("User",userSchema);
