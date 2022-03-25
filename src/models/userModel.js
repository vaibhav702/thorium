const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
     
      trim: true,
      enum: ["Mr", "Mrs", "Miss"],
    },
    name: { type: String, required: true,  trim: true },
    phone: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("project3_registerUser", userSchema);
