const mongoose = require("mongoose");
const Category = require("../models/categories.model");
//const RingSizeSchema = require("../models/ringsize.model").RingSizeSchema;
const ProductSchema = mongoose.Schema(
  {
    title: String,
    experDate: { type: Date, default: Date.now },
    images: [],
    color: String,
    brand: {
      name: String,
      img: String,
    },
    shipping: {
      weigh: Number,
      dimensions: {
        width: Number,
        height: Number,
        depth: Number,
      },
    },
    description: [
      {
        lang: String,
        details: String,
      },
    ],
    reviewPoint: {
      username: String,
      count: Number,
    },
    certification: String,
    returnPolicy: String,
    sublabel: String,
    pricetype: [
      {
        pricepackagename: String, 
        pickagetype:String,
        list: Number, //15000 2000
        sellprice: Number,
        buyprice: Number,
        Quantity: Number, //100 100
        sellquantity: Number, //50 0
        indate: String,
        unittype:String,
        quantitype:String

      },
    ] /* {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PriceType",
      require: true,
    } */,
    maincategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
