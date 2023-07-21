const ProductModel = require("../models/product.model");

const moongoose = require("mongoose");
const { default: mongoose } = require("mongoose");

//callback ပုံစံ‌နှင့် ရေးသားထားတာ ြဖစ်ပါတယ်။
exports.createprod = (req, res, next) => {
  try {
    console.log(req.body);
   const productmodel = new ProductModel({
     title: req.body.title,
     loginid:req.body.loginid,    
     description: req.body.description,
     images:req.body.images,
    // reviewPoint:  arraypush( req.body.reviewPoint),
    //  reviewPoint: { 
    //    username: req.body.reviewPoint.username,
    //    count: req.body.reviewPoint.count,
    //  },
     price: req.body.pricetype,
     sellbook: {
       quantity: req.body.sellbook.quantity,
       sellprice: req.body.sellbook.sellprice,
     },
     discount: req.body.discount,
     booktype: req.body.booktype,
     publicationdate: req.body.publicationdate,
     epubLocator: arraypush(req.body.epubLocator),
     author: arraypush(req.body.author),
    comment: arraypush(req.body.comment),
     maincategory: req.body.maincategory,
   });
   productmodel.save((err, data) => {
     if (err) res.status(501).send(err);
     else res.status(200).json(data);
   });
 } catch (err) {
   return res.status(500).send({
     message: err.message,
   });
   next();
 }
  
};

exports.updateprod = async (req, res, next) => {
  try {
    console.log(req.body);
    const updatedata = await ProductModel.findByIdAndUpdate(
      {
        _id: req.body.id,
      },
      {
        title: req.body.title,
      description: req.body.description,
        images: req.body.images,
        price: req.body.pricetype,
        sellbook: {
          quantity: req.body.sellbook.quantity,
          sellprice: req.body.sellbook.sellprice,
        },
        discount: req.body.discount,
        booktype: req.body.booktype,
        publicationdate: req.body.publicationdate,
        epubLocator: arraypush(req.body.epubLocator),
        author: arraypush(req.body.author),
        maincategory: req.body.maincategory, 
      },{new:true}
    );
    return res.status(200).json({
      product: updatedata,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.updateComment = async (req, res, next) => {
  try {
    console.log(req.body);
    const updatedata = await ProductModel.findByIdAndUpdate(
      {
        _id: req.body.id,
      },
      {
       
        comment: arraypush(req.body.comment),
      
      },{new:true}
    );
    res.status(200).json({ product: [updatedata] });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.findsubandtitleprod = (req, res, next) => {
  try {
    ProductModel.find({
      $or: [
        { title: { $regex: req.params.query, $options: "i" } },
        { sublabel: { $regex: String(req.params.query), $options: "i" } },
        { "brand.name": { $regex: req.params.query, $options: "i" } },
      ],
    })
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
exports.find_main_category = (req, res, next) => {
  try {
    ProductModel.find({
      $or: [
        
        { maincategory: { $regex: String(req.params.query), $options: "i" } },
        
      ],
    })
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
exports.find_sub_category = (req, res, next) => {
  try {
   
    ProductModel.find({
      $or: [
       
        { maincategory: { $regex: String(req.body.title), $options: "i" } },
        { sublabel: { $regex: String(req.body.title), $options: "i" } },
        
      ],
    }).skip(parseInt(req.body.offest)).limit( parseInt(req.body.pagesize))
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
    ProductModel.find({ _id: req.params.id })

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
    ProductModel.find({ $text: { $search: "education", $language: "es" } })
    .exec(function (err, data) {
      if (err)
        return res.status(500).send({
          message: err.message,
        });
      res.status(200).json({ data });
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
    next();
  }
};

exports.searchany = (req, res, next) => {
  try {
    console.log(req.body);
   
    ProductModel.find({
      $or: [
       
        { title: { $regex: String(req.body.title), $options: "i" } },
       // { author: { $elemMatch: { name: { $regex: req.body.key }} } }
           { "author.name": { $regex: String(req.body.title), $options: "i" } },
        
      ],
    }).skip(parseInt(req.body.offest)).limit( parseInt(req.body.pagesize))
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
exports.authorsearchany = (req, res, next) => {
  try {
    //console.log(req.body);
   
    ProductModel.find({
      $and: [
       
        { title: { $regex: String(req.body.title), $options: "i" } },
        { loingid:  { $regex: req.body.loginid } }
      //  { "author.$.name": { $regex: String(req.body.title), $options: "i" } },
        
      ],
    }).skip(parseInt(req.body.offest)).limit( parseInt(req.body.pagesize))
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
exports.authorPro = (req, res, next) => {
  try {
    //console.log(req.body);
   
    ProductModel.find({
      $or: [
        
        { loginid: { $regex: String(req.body.loginid), $options: "i" } },
        
      ],
    }).skip(parseInt(req.body.offest)).limit( parseInt(req.body.pagesize))
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
    ProductModel.aggregate([
      {
        $group: { _id: "$brand.name" },
      },
    ]).exec(function (err, data) {
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
//  console.log(req.params.query);
  try {

    ProductModel.aggregate([{ $sort: { "sellbook.sellprice": parseInt(req.body.sort) } }]).skip(parseInt(req.body.offest)).limit(parseInt(req.body.pagesize)).exec(
      function (err, data) {
        if (err)
          return res.status(500).send({
            message: err.message,
          });

        res.status(200).json({ product: data });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: err,
    });
    next();
  }
};
exports.newarrivel = (req, res, next) => {
  
  // date format = "2023-03-24"
  try {
    console.log("new")
    const filters = {
      createdAt:{
        createdAt:{$gte:new Date(req.params.gdate),$lte:new Date(req.params.ldate)}
      } 
    };
    ProductModel.find(
      {filters}).exec(
      function (err, data) {
        if (err)
          return res.status(500).send({
            message: err,
          });

        res.status(200).json({ product: data });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: err,
    });
    next();
  }
};

exports.cutomerProductlist = (req, res, next) => {
  try {
   // console.log(req.body.download) ;
    ProductModel.find({
      _id: { $in: req.body.download },
    }).exec((err, cdata) => {
      if (err) {
        res.status(402).send(err);
      }
      res.status(200).json({
        product: cdata,
      });
    });
  } catch (error) {}
};
exports.cutomerrecentlist = (req, res, next) => {
  try {
    ProductModel.find({
      _id: { $in: req.body.recent },
    }).exec((err, cdata) => {
      if (err) {
        res.status(402).send(err);
      }
      res.status(200).json({
        product: cdata,
      });
    });
  } catch (error) {}
};
exports.findAllprod = (req, res, next) => {
  
  
  ProductModel.find().skip(parseInt(req.body.offest)).limit( parseInt(req.body.pagesize))
    //.populate("maincategory_id")
    .exec(function (err, data) {
      if (err)
        return res.status(500).send({
          message: err.message,
        });
        console.log(data);
      res.status(200).json({ product: data });
    });
};


exports.findthemostpopular = (req, res, next) => {
  
  
  ProductModel.aggregate([{ $sort: { "sellbook.quantity": 1 } }]).limit(15)
    //.populate("maincategory_id")
    .exec(function (err, data) {
      if (err)
        return res.status(500).send({
          message: err.message,
        });
        console.log(data);
      res.status(200).json({ product: data });
    });
};
// exports.updateprod = (req, res, next) => {
//   try {
//     console.log("update data from medical store id", req.body);
//     var findupdate = ProductModel.findById(
//       { _id: req.body.Id },
//       function (err, data) {
//         if (err) return res.status(500).json({ message: err });
//         else {
//           data.title = req.body.title;
       
//           req.body.pricetype.forEach((element) => {
//             updateprice(data._id, element);
//           });
        

//           data.save(function (err) {
//             if (err) res.send(err);
//             // res.json({ product: data });
//           });

//           res.json({ message: "sucessfully", editprodut: data });
//         }
//       }
//     );
//   } catch (err) {
//     res.json({ message: "product edit error" });
//   }
// };
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
  console.log("delete id", req.params.id);
  // var delete_id=mongoose.Types.ObjectId(req.params.id);
  const delete_prod = ProductModel.deleteOne(
    { _id: req.params.id },
    function (err, data) {
      if (err) res.json({ message: err });
      else res.json({ message: "delete data" });
    }
  );
};


