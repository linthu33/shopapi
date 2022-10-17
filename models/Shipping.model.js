const mongoose = require("mongoose");

const ShippingSchema = mongoose.Schema(
  {
    freeship: String,
    pickup: String,
    fedexPrioritydays: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shipping", ShippingSchema);
