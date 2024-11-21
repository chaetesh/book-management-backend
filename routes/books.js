const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, author, isbn, genre, coverImage } = req.body;
  try {
    const book = new Book({ title, author, isbn, genre, coverImage });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const { title, author, isbn } = req.query;
  try {
    const query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };
    if (isbn) query.isbn = isbn;

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
