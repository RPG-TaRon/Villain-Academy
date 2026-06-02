const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createAssignment,
  getAssignmentsByClass,
  updateAssignment,
} = require("../controllers/assignmentController");

router.post("/class/:classId", authMiddleware, createAssignment);

router.get("/class/:classId", authMiddleware, getAssignmentsByClass);

router.put(
  "/class/:classId/:assignmentId",
  authMiddleware,
  updateAssignment
);

module.exports = router;