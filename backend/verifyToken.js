const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json("you are not authenticated");
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json("token is invalid");
    }
    req.userId = data._id;
    next();
  });
};

module.exports = verifyToken;