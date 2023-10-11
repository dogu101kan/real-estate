const express = require("express");
const auth = require("./auth");
const user = require("./user");
const house = require("./product");

const router = express.Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/house", house);

module.exports = router;