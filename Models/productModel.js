let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let config = require("config");

let productSchema = new mongoose.Schema({
  name: { type: String, min: 3, max: 550 },
  image: { type: String },
  description: { type: String },
  price: { type: Number, minlength: 1 },
  offerPrice: { type: Number, minlength: 1 },
  isAvailable: { type: Boolean },
  isTodayOffer: { type: Boolean },
  category: { type: String, minlength: 3, maxlength: 100 },
  subcategory: { type: String, minlength: 3, maxlength: 100 },
  isAdmin: { type: Boolean },
  recordDate: { type: Date, default: Date.now },
  updatedate: { type: Date, default: Date.now }
});
let product = mongoose.model("product", productSchema);
module.exports = product;
