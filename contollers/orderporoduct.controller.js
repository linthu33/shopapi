const CustomerModel = require("../models/Customer.model");
const OrderProductModel = require("../models/order.product.model");
const ShippingModel = require("../models/Shipping.model");
const ObjectId = require("mongodb").ObjectId;

exports.orcreate = async (req, res, next) => {
  console.log("OrderProduct", req.body);
  const pid = "123";
  //var shppid = "123";
  var cid = "123";
  if (!cid) {
    res.send("cid is null", cid);
  } else {
    //cid = await customerid(req, res);
    // shppid = shippingSaveAndGetId(req, res);
    const OrderProductData = new OrderProductModel({
      orderdate: req.body.orderdate,
      orderstatus: req.body.orderstatus,
      barcode: req.body.barcode,
      totalquantity: req.body.totalquantity,
      tax: req.body.tax,
      deliveryprice: req.body.deliveryprice,
      totalAmount: req.body.totalAmount,
      discount: req.body.discount,
      ShippingDate: new Date(),
      paymentmethod: req.body.paymentmethod,
      paymentstatus: req.body.paymentstatus,
      totalprofit: req.body.totalprofit,
      customerid: req.body.customerId,
      delivery: {
        title: req.body.title,
        price: req.body.price,
        estimateTime: req.body.estimateTime,
      },
      shippingaddress: {
        fullName: req.body.shippingaddress.fullName,
        Phone: req.body.shippingaddress.Phone,
        address: req.body.shippingaddress.address,
        city: req.body.shippingaddress.city,
        state: req.body.shippingaddress.state,
        postal: req.body.shippingaddress.postal,
        country: req.body.shippingaddress.country,
        isDefault: true,
      },
      //customerid: cid,
      Orderitem: arraypush(req.body.Orderitem),
    });
    //OrderProductData.productid.push(req.body.productid)
    OrderProductData.save()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
}; //end opcreate
async function customerid(req, res) {
  var customer = new CustomerModel({
    fullName: req.body.fullName,
    /* phone: req.body.phone,
    city: req.body.cid,
    state: req.body.state,
    postal:req.body.postal, */
    isDefault: req.body.isDefault,
    address: arraypush(req.body.address),
    //address: "523698",
  });

  await customer.save(function (err) {
    if (err) return handleError(err);
    //res.send("Customer data save sucessfully");
    console.log("Customer data save sucessfully");
  });
  //console.log("customer ic",customer._id)
  return customer._id;
}

function shippingSaveAndGetId(req, res) {
  const shippingdata = new ShippingModel({
    freeship: "free",
    pickup: "pick up from shop",
    fedexPrioritydays: "Withing 5 days after apyment",
  });
  shippingdata.save(function (err) {
    if (err) return res.status(500).send("Shipping model no save");
    //res.status(200).send("Shipping data save sucessfully");
    console.log("Shipping data save sucessfully");
  });
  return shippingdata._id;
}
//#region  StaffRoles , Drugs , Diagnosises , Treatmensts mCharges
function arraypush(arr) {
  let arrdata = [];
  //console.log("address list",arr)
  for (list of arr) {
    arrdata.push(list);
  }
  //console.log("console ", list);
  return arrdata;
}

exports.orfindone = async (req, res) => {
  try {
    const findorder = await OrderProductModel.findOne({
      orderstatus: "true",
    });

    if (!findorder) {
      return res.status(404);
    }
    res.status(200).send(findorder);
  } catch (err) {
    res.status(500).send(error);
  }
};

exports.orfindall = async (req, res, next) => {
  try {
    const findorder = await OrderProductModel.find({});

    if (!findorder) {
      return res.status(404);
    }
    res.status(200).send({ Order: findorder });
  } catch (err) {
    res.status(500).send(error);
  }
};
/*

exports.opupdate=(req,res,next) =>{

}
 */
exports.ordelete = async (req, res, next) => {
  try {
    const deleteorder = await OrderProductModel.deleteOne({ _id: req.body.id });

    if (!deleteorder) {
      return res.status(404);
    }
    res.status(200).send(deleteorder);
  } catch (err) {
    res.status(500).send(error);
  }
};
exports.orfindstatus = async (req, res) => {
  try {
    const cid = ObjectId.isValid(req.body.customerid);
    console.log(cid);
    if (cid) {
      const findorder = await OrderProductModel.find({
        orderstatus: req.body.orderstatus,
        customerid:ObjectId(req.body.customerid)
      }).exec((err,data)=>{
        if(err)
        res.status(500).send(err);
        res.status(200).json({Order:data});
      });
     
    } else res.send("cast err");
  } catch (err) {
    res.status(500).send(err);
  }
};
