const mongoose = require("mongoose");

const GlueSchema = mongoose.Schema({
  indate: String,
  openbalance: Number,
  afterstirglue: Number,
  issue: Number,
  returnglue: Number,
  produceglue: Number,
  totalglue: Number,
  productId: String,
});

module.exports = mongoose.model("Glue", GlueSchema);
