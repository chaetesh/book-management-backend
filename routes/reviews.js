const express = require("express");
const Review = require("../models/Review");
const Book = require("../models/Book");

const router = express.Router();

// Add a new review
router.post("/", async (req, res) => {
  const { bookId, text, rating } = req.body;

  try {
    // Create the review
    const review = new Review({
      text,
      rating,
      book: bookId,
    });
    await review.save();

    // Add the review to the book's reviews array
    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all reviews for a book
router.get("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ book: bookId });
    const averageRating = (
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    ).toFixed(1);

    res.json({ reviews, averageRating });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit a review
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { text, rating } = req.body;

  try {
    const review = await Review.findOne({ _id: id });
    if (!review)
      return res
        .status(404)
        .json({ message: "Review not found or not authorized" });

    review.text = text;
    review.rating = rating;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a review
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findOne({ _id: id });
    if (!review)
      return res
        .status(404)
        .json({ message: "Review not found or not authorized" });

    // Remove review reference from the associated book
    await Book.findByIdAndUpdate(review.book, { $pull: { reviews: id } });

    await review.remove();

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
