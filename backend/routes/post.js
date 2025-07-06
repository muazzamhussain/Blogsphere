const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");
const mongoose = require("mongoose");

// Create
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost); // ✅ Make sure this returns the _id
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("post deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user posts
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(200).json(error);
  }
});

// Get Posts
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;
    const posts = await Post.find(
      search ? { title: { $regex: search, $options: "i" } } : {}
    );

    res.status(200).json(posts);
  } catch (error) {
    res.status(200).json(error);
  }
});

// Get
router.get("/:postId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
