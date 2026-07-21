const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");

const {
  saveScheme,
  getSavedSchemes,
  deleteSavedScheme,
} = require("../controllers/savedScheme.controller");

router.post("/", protect, saveScheme);
router.get("/", protect, getSavedSchemes);
router.delete("/:schemeId", protect, deleteSavedScheme);

module.exports = router;