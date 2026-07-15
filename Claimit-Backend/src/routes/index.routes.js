const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/schemes", require("./scheme.routes"));
// router.use("/users", require("./user.routes"));

module.exports = router;