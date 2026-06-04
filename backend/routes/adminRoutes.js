const router = require("express").Router();

const {
  getAcademyData,
  updateUserByAdmin,
  updateClassByAdmin,
  updateAssignmentByAdmin,
  deleteUserByAdmin,
  deleteClassByAdmin,
  deleteAssignmentByAdmin,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/academy", authMiddleware, adminMiddleware, getAcademyData);

router.put(
  "/users/:userId",
  authMiddleware,
  adminMiddleware,
  updateUserByAdmin
);

router.put(
  "/classes/:classId",
  authMiddleware,
  adminMiddleware,
  updateClassByAdmin
);

router.put(
  "/assignments/:assignmentId",
  authMiddleware,
  adminMiddleware,
  updateAssignmentByAdmin
);

router.delete(
  "/users/:userId",
  authMiddleware,
  adminMiddleware,
  deleteUserByAdmin
);

router.delete(
  "/classes/:classId",
  authMiddleware,
  adminMiddleware,
  deleteClassByAdmin
);

router.delete(
  "/assignments/:assignmentId",
  authMiddleware,
  adminMiddleware,
  deleteAssignmentByAdmin
);

module.exports = router;