const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createAssignment,
  getAssignmentsByClass,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");
//assignment routes
router.post("/class/:classId", authMiddleware, createAssignment);

router.get("/class/:classId", authMiddleware, getAssignmentsByClass);

router.put(
  "/class/:classId/:assignmentId",
  authMiddleware,
  updateAssignment
);

router.delete(
  "/class/:classId/:assignmentId",
  authMiddleware,
  deleteAssignment
);

module.exports = router;