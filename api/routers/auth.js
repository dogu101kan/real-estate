const express = require("express");
const { signUp, login, googleSign} = require("../controllers/auth");

const router = express.Router();


router.post("/register", signUp);
router.post("/login", login);
router.post("/google", googleSign);

module.exports = router;