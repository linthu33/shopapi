const mongoose = require("mongoose");
//const addressmodel = require("../models/address.model");
//many to many relationa
const OrderProductSchema = mongoose.Schema(
  {
    barcode:String,
    orderdate: String,
    orderstatus: String,
    totalquantity: Number,
    tax: Number,
    deliveryprice: Number,
    totalAmount: Number,
    discount: Number,
    ShippingDate: Date,
    paymentmethod: String,
    paymentstatus: String,
    totalprofit: String,
    delivery: {
      title: String,
      price: Number,
      estimateTime: String,
    },
    shippingaddress: {
      fullName: String,
      Phone: String,
      address: String,
      city: String,
      state: String,
      postal: String,
      country: String,
      isDefault: Boolean
    },
    customerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    Orderitem: [
      {
        productid: String,
        producttype: String,
        sellprice: Number,
        buyprice: Number,
        quantity: Number,
        totalamount: Number,
        discount: Number,
        profile: Number,
        itemStatus: String,
        expiredate: String,
        image:String
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderProduct", OrderProductSchema);
