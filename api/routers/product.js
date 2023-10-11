const express = require("express");
const { getAccess, getSellerAccess } = require("../middlewares/authorization/auth");
const { addProduct } = require("../controllers/product");


const router = express.Router();

router.post("/add", [getAccess, getSellerAccess], addProduct);

module.exports = router;