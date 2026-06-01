const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    token = token.split(" ").pop().trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized", error: err.message });
  }
};

module.exports = authMiddleware;