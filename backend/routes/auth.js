const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong during registration");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json("Wrong password");

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...info } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // ✅ Only set to true if using HTTPS
        sameSite: "lax", // ✅ Lax is usually better in dev
      })
      .status(200)
      .json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong during login");
  }
});

// Logout
router.get("/logout", (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: false, // ✅ must match how the cookie was set
        sameSite: "lax", // ✅ must match how the cookie was set
      })
      .status(200)
      .send("User logged out");
  } catch (error) {
    console.error(error);
    res.status(500).json("Logout failed");
  }
});

// Refetch
router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json("No token found");

  jwt.verify(token, process.env.SECRET, {}, (err, data) => {
    if (err) return res.status(403).json("Token invalid");
    res.status(200).json(data);
  });
});

module.exports = router;
