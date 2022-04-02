const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema(
  {
    bookId: { type: ObjectId, required: true, ref: "bookTest" },
    reviewedBy: { type: String,required:true, default: "Guest" },
    reviewedAt: { type: Date, required: true },
    rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    review: { type: String, default:"" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);
module.exports = mongoose.model("reviewTest", reviewSchema);
