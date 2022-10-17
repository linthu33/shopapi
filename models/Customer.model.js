const moongoose = require("mongoose");
//const Address = require("../models/address.model").AddressSchema;
const CustomerSchema = moongoose.Schema(
  {
    fullName: String,
    email:String,
    password:String,
    isDefault:String,
    address: [
      {
        phone: String,
        city: String,
        state: String,
        postal: String,
        country:String,
        homenumber:String,
        isDefault:String,
      }
    ],
   
   
  },
  {
    timestamps: true,
  }
);

module.exports = moongoose.model("Customer", CustomerSchema);
