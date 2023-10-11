const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["sale", "rent"],
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
  },
  bathrooms: {
    type: Number,
    min: 0,
    required: true,
  },
  bedrooms: {
    type: Number,
    min: 0,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  garage: {
    type: Boolean,
    required: true,
  },
  offer: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array,
  },
  userRef: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", ProductSchema);
