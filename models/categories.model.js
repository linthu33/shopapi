const mongoose = require("mongoose");
//const Subcategory = require("../models/subcategory.model").SecondcategorySchema;
const sublabelSchema = mongoose.Schema({
  sublabelname: String,
});

const CategorySchema = mongoose.Schema({
  maincategory: String,
  subcategory:[]
});

module.exports = mongoose.model("Category", CategorySchema);
