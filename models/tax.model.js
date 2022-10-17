const mongoose = require("mongoose");
//const Subcategory = require("../models/subcategory.model").SecondcategorySchema;


const taxSchema = mongoose.Schema({
  tax: Number,
 
});

module.exports = mongoose.model("Tax", taxSchema);
