const router = require("express").Router();

const {
  createClass,
} = require("../controllers/classController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createClass);

module.exports = router;