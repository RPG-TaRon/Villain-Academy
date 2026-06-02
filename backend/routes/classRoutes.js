const router = require("express").Router();

const {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getClasses);
router.get("/:id", authMiddleware, getClassById);
router.post("/", authMiddleware, createClass);
router.put("/:id", authMiddleware, updateClass);
router.delete("/:id", authMiddleware, deleteClass);

module.exports = router;