const router = require("express").Router();

const {
  createClass,
  getClasses,
  getClassById,
} = require("../controllers/classController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getClasses);
router.get("/:id", authMiddleware, getClassById);
router.post("/", authMiddleware, createClass);

module.exports = router;