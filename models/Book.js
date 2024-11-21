const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true, required: true },
  genre: { type: String },
  coverImage: {
    type: String,
    default:
      "https://plus.unsplash.com/premium_vector-1715961962846-b3d272232abf?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Book", BookSchema);
