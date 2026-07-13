const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/auth.controller");
const { loginUser } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    userId: req.user.id,
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile route reached",
  });
});

module.exports = router;