const router = require("express").Router();

const {
  createAssignment,
  getAssignmentsByClass,
} = require("../controllers/assignmentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/class/:classId",
  authMiddleware,
  createAssignment
);

router.get(
  "/class/:classId",
  authMiddleware,
  getAssignmentsByClass
);

module.exports = router;