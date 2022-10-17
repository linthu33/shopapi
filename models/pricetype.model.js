const mongoose = require("mongoose");

const PriceTypeSchema = mongoose.Schema({
  // pricetype: String, //အင်ကျီ
  pricepackage: [
    {
      pricepackagename: String, // s m
      list: Number, //15000 2000
      sellprice: Number,
      buyprice: Number,
      Quantity: Number, //100 100
      sellquantity: Number, //50 0
      indate: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("PriceType", PriceTypeSchema);
