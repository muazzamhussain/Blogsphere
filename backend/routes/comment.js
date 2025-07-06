const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

// Create comment
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update comment
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete comment
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("comment deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get comments for a post
router.get("/post/:postId", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
