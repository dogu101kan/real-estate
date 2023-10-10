const express = require("express");
const { test, updateUser, deleteUser } = require("../controllers/user");
const {getAccess} = require("../middlewares/authorization/auth");

const router = express.Router();

router.get("/", test);
router.post("/update/:id", [getAccess], updateUser);
router.delete("/delete/:id", [getAccess], deleteUser);

module.exports = router;