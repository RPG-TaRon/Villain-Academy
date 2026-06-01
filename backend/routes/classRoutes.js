const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Class routes working" });
});

module.exports = router;