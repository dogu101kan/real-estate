const express = require("express");
const { signUp, login, googleSign, imageUpload, logout} = require("../controllers/auth");
const { getAccess } = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/multer/imageUploadProfile")

const router = express.Router();


router.post("/register", signUp);
router.post("/login", login);
router.post("/google", googleSign);
router.post("/upload", [getAccess, profileImageUpload.single("image_p")], imageUpload);
router.get("/logout", logout);

module.exports = router;