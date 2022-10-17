const moongoose=require('mongoose');

const SellerSchema=moongoose.Schema({
    fullName: String,
    Phone: String,
    address: String,
    city: String,
   
   // isDefault: String,
})
module.exports=moongoose.model("Seller",SellerSchema);