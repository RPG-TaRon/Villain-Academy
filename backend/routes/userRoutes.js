const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
//user routes
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, getMe);

module.exports = router;