const moongoose = require("mongoose");
const CustomerSchema = moongoose.Schema(
  {
    fullName: String,
    email:String,
    password:String,
    phone: String,
    role:String,
    author: [
      {
        authorname:String,
        birthday:String,
        about:String,
        city: String,
        state: String,
        postal: String,
        country:String,
        homenumber:String,
        email:String,
        isDefault:String,
        phone: String,
       
      }
    ],
    download:[],
    recent:[],
   
   
  },
  {
    timestamps: true,
  }
);

module.exports = moongoose.model("Customer", CustomerSchema);
