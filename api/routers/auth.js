const express = require("express");
const { signUp } = require("../controllers/auth");

const router = express.Router();


router.post("/register", signUp);

module.exports = router;