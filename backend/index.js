const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/comment");

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true, // ✅ allow sending cookies
  })
);
app.use(cookieParser());
dotenv.config();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // This must be a folder named "images" in root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix.toString() + ext); // Convert to string and add extension
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ filename: req.file.filename });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection established");
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.PORT, () => {
  console.log("App is listening on PORT " + process.env.PORT);
  connectDB();
});
