const asyncErrorWrapper = require("express-async-handler");
const Product = require("../models/Product");

const addProduct = asyncErrorWrapper(async (req, res, next) => {
  const product = await Product.create({
    title: req.body?.title,
    description: req.body?.description,
    type: req.body?.type,
    adress: req.body?.adress,
    price: req.body?.price,
    discount: req.body?.discount,
    bathrooms: req.body?.bathrooms,
    bedrooms: req.body?.bedrooms,
    furnished: req.body?.furnished,
    garage: req.body?.garage,
    offer: req.body?.offer,
    images: req.body?.images,
    userRef: req.body?.userRef,
  });

  return res.status(201).json({
    success: true,
    data: product
  });
});

module.exports = {
  addProduct,
};
