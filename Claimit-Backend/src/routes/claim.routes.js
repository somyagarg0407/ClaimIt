const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");

const { createClaim} = require("../controllers/claim.controller");

router.post("/", protect, createClaim);

module.exports = router;