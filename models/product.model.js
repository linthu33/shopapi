const mongoose = require("mongoose");
const Category = require("../models/categories.model");
//const RingSizeSchema = require("../models/ringsize.model").RingSizeSchema;
const ProductSchema = mongoose.Schema(
  {
    loginid:String,
    title: String,   
    description: String,
    images:String,
    reviewPoint: {
      username: String,
      count: Number,
    },
    sublabel: String,
    price: Number,
    sellbook: {
      quantity: Number,
      sellprice: Number,
    },
    discount: Number,
    booktype: String,
    epubLocator: [
      {
        bookId: String,
        href: String,
        created: String,
        locations: String,
      },
    ],
    author: [
      {
        auid: String,
        name: String,
        about: String,
      },
    ],

    publicationdate: String,
    comment: [
      {
        userid: String,
        name: String,
        postcomment: String,
      },
    ],
    maincategory:String
  },
  {
    timestamps: true,
  }
);
ProductSchema.index({ "$**": "text" });
module.exports = mongoose.model("Product", ProductSchema);
