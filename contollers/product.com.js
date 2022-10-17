const ProductModel = require("../models/product.model");
const CategortModel = require("../models/categories.model");
const moongoose = require("mongoose");
const { default: mongoose } = require("mongoose");

//callback ပုံစံ‌နှင့် ရေးသားထားတာ ြဖစ်ပါတယ်။
exports.createprod = (req, res, next) => {
  console.log("client send data", req.body);
  try {
    // category
    const category = new CategortModel({
      maincategory: req.body.maincategory,
      subcategory: arraypush(req.body.subcategory),
    });
    //console.log("product data", packagetype_arr);
    const productmodel = new ProductModel({
      title: req.body.title,
      experDate: req.body.experDate,
      images: arraypush(req.body.images),
      color: req.body.color,
      brand: req.body.brand,
      shipping: {
        weigh: req.body.shipping.weigh,
        dimensions: {
          width: req.body.shipping.dimensions.width,
          height: req.body.shipping.dimensions.height,
          depth: req.body.shipping.dimensions.depth,
        },
      },
      description: arraypush(req.body.description),
      reviewPoint: {
        username: req.body.reviewPoint.username,
        count: req.body.reviewPoint.count,
      },
      certification: req.body.certification,
      returnPolicy: req.body.returnPolicy,
      sublabel: req.body.sublabel,
      pricetype: arraypush(req.body.pricetype),
    });
    /*  const pricetypemodel = new PriceType({
      //pricetype: req.body.pricetype,
      pricetype: arraypush(req.body.pricepackage),
      //inventorylist: arraypush(req.body.inventorylist),
    }); */
    category.save((err, cdata) => {
      if (err) res.status(501).send(err);
      else {
        productmodel.maincategory_id = cdata._id;
        productmodel.save((err, data) => {
          if (err) res.status(501).send(err);
          else res.status(200).json(data);
        });
      }
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
    next();
  }
};
exports.findsubandtitleprod = (req, res, next) => {
  
  try {
    ProductModel.find({$or:[
      
      {title:{$regex:req.params.query,$options: 'i'}},
      {sublabel:{$regex:String(req.params.query),$options: 'i'}},
      {"brand.name":{$regex:req.params.query,$options: 'i'}},
     ]})
   
    .populate("pricetype")
    .exec(function (err, data) {
      if (err)
        return res.status(500).send({
          message: err.message,
        });
      
      res.status(200).json({ product: data });
    });
   
  } catch (err) {
    res.status(500).json({
      message: err,
    });
    next();
  }
};

exports.findidprod = (req, res, next) => {

  try {
    ProductModel.find({_id:req.params.id})
   
    .populate("pricetype")
    .exec(function (err, data) {
      if (err)
        return res.status(500).send({
          message: err.message,
        });
      res.status(200).json({ product: data });
    });
   
  } catch (err) {
    res.status(500).json({
      message: err,
    });
    next();
  }
};
exports.findOneprod = (req, res, next) => {

  try {
    ProductModel.find({maincategory_id:req.params.id})
   
    .populate("pricetype")
    .exec(function (err, data) {
      if (err)
        return res.status(500).send({
          message: err.message,
        });
      res.status(200).json({ product: data });
    });
   
  } catch (err) {
    res.status(500).json({
      message: err,
    });
    next();
  }
};
exports.GroupbyBarndprod = (req, res, next) => {

  try {
    ProductModel.aggregate([{
      $group:{_id:"$brand.name"}
    }])
    .exec(function (err, data) {
      if (err)
        return res.status(500).send({
          message: err.message,
        });
      res.status(200).json({ Brand: data });
    });
   
  } catch (err) {
    res.status(500).json({
      message: err,
    });
    next();
  }
};
exports.sortprod = (req, res, next) => {
  console.log(req.params.query);
  try {
    const sortid=parseInt(req.params.query);
    ProductModel.aggregate([{$sort:{"pricetype.sellprice":sortid}}])
    .exec(function (err, data) {
      if (err)
        return res.status(500).send({
          message: err.message,
        });
     
      res.status(200).json({ product: data });
    });
    
   
  } catch (err) {
    res.status(500).json({
      message: err,
    });
    next();
  }
};
exports.findAllprod = (req, res, next) => {
  ProductModel.find()
    //.populate("maincategory_id")
    .populate("pricetype")
    .exec(function (err, data) {
      if (err)
        return res.status(500).send({
          message: err.message,
        });
      res.status(200).json({ product: data });
    });
};
exports.updateprod = (req, res, next) => {
  try {
    console.log("update data from medical store id", req.body);
    var findupdate = ProductModel.findById(
      { _id: req.body.Id },
      function (err, data) {
        if (err) return res.status(500).json({ message: err });
        else {
          data.title = req.body.title;
          //data.color = req.body.color;
          //console.log(data.pricetype);
          req.body.pricetype.forEach((element) => {
            updateprice(data._id, element);
          });
          /*  for (let index = 0; index <  req.body.pricetype.length; index++) {
            const element = req.body.pricetype[index];
            updateprice(data._id, element,);
          } */

          data.save(function (err) {
            if (err) res.send(err);
            // res.json({ product: data });
          });

          res.json({ message: "sucessfully", editprodut: data });
        }
      }
    );
  } catch (err) {
    res.json({ message: "product edit error" });
  }
};
/*exports.updateprod = (req, res, next) => {};


 */
function stringarr(str) {
  let strarr = [""];
  strarr.push(str);
  return strarr;
}
function arraypush(arr) {
  let arrdata = [];
  for (list of arr) {
    arrdata.push(list);
  }
  //console.log("console ", list);
  return arrdata;
}
//#region Update Drug,Diagnosis.charge
const updateprice = async function (product, pricetype) {
  console.log("edit edit price", pricetype._id);
  return await ProductModel.updateOne(
    { _id: product._id, "pricetype._id": pricetype._id },
    {
      $set: {
        "pricetype.$.list": pricetype.list,
        "pricetype.$.sellprice": pricetype.sellprice,
        "pricetype.$.buyprice": pricetype.buyprice,
        "pricetype.$.Quantity": pricetype.Quantity,
        "pricetype.$.sellquantity": pricetype.sellquantity,
      },
    },
    { new: true }
  );
};
exports.deleteprod = (req, res, next) => {
  console.log("delete id",req.params.id);
 // var delete_id=mongoose.Types.ObjectId(req.params.id);
  const delete_prod=ProductModel.deleteOne({_id:req.params.id},function(err,data){
   if(err)
   res.json({message:err})
   else
   res.json({message:'delete data'})
  })
};
