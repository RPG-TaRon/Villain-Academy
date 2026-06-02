const router = require("express").Router();

const {
  createAssignment,
} = require("../controllers/assignmentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/class/:classId",
  authMiddleware,
  createAssignment
);

module.exports = router;