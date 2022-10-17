const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema(
  {
    paymentDate: Date,
    Ammount: Number,
    customerId: Number,
    orderproductId:Number
  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model("Payment",PaymentSchema);
