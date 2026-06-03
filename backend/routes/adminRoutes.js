const router = require("express").Router();

const {
  getAcademyData,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
  "/academy",
  authMiddleware,
  adminMiddleware,
  getAcademyData
);

module.exports = router;