const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,

      trim: true,
      enum: ["Mr", "Mrs", "Miss"],
    },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
        isAsync: false, //The validator dosn't play well with mongoose to get rid of the warning set isAsync to false
      },
    },
    password: { type: String, required: true },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userTest", userSchema);
