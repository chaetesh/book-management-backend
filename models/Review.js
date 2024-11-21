const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
});

module.exports = mongoose.model("Review", ReviewSchema);
