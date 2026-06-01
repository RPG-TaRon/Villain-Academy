const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Assignment routes working" });
});

module.exports = router;