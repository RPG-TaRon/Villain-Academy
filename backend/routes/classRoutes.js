const router = require("express").Router();

const {
  createClass,
  getClasses,
  getClassById,
  updateClass,
} = require("../controllers/classController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getClasses);
router.get("/:id", authMiddleware, getClassById);
router.post("/", authMiddleware, createClass);
router.put("/:id", authMiddleware, updateClass);

module.exports = router;