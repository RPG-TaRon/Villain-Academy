const router = require("express").Router();

const {
  createClass,
  getClasses,
} = require("../controllers/classController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createClass);
router.get("/", authMiddleware, getClasses);

module.exports = router;