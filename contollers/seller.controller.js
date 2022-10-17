const SellerModel = require("../models/seller.model");
exports.depCreate = async (req, res, next) => { 

  try {
    const newdep = new SellerModel({
      fullName:req.body.fullName,
      Phone: req.body.Phone,
      address: req.body.address,
      city:req.body.city
    });
    await newdep.save();
    res.status(200).json(newdep);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
exports.depFindall = async (req, res, next) => {
  try {
    SellerModel.find()
    .sort({'fullName':1})
 
    .exec(function (err, departments) {
      if (err)
        return res
          .status(500)
          .json({ message: "Your patients do not exits", error: err });
      res.status(200).json({seller:departments});
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
exports.depFindone = async (req, res, next) => {
   console.log(req.params.query);
 
  try {
    SellerModel.find({$or:[
      {fullName:{$regex:req.params.query,$options: 'i'}},
      {city:{$regex:String(req.params.query),$options: 'i'}}
     ]})
    
    .exec(function (err, departments) {
      if (err)
        return res
          .status(500)
          .json({ message: "Your patients do not exits", error: err });
      res.status(200).json({seller:departments});
    });
    
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
exports.depUpdate = async (req, res, next) => {
  
  try {
    SellerModel.findByIdAndUpdate(req.body._id, {
        fullName:req.body.fullName,
        Phone: req.body.Phone,
        address: req.body.address,
        city:req.body.city
  }, {new: true})
    .exec(function (err, departments) {
      if (err)
        return res
          .status(500)
          .json({ message: "Your Departemnt do not exits", error: err });
      res.status(200).json(departments);
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }

};

exports.depDelete = async (req, res, next) => {
  try{
    console.log("defef",req.params.id)
    SellerModel.deleteOne({_id:req.params.id}).exec(function (err,data){
      if(err)
      {
        return res
        .status(500)
        .json({ message: "Your patients do not exits", error: err });
      }
      else
      {
       
       
        res.status(200).json(data);
      }
     
    }

    )

  }catch(err){

  }
};