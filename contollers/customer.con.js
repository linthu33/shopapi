const CustomerModel = require("../models/Customer.model");
exports.create = async (req, res, next) => {
  try {
    console.log(req.body)
    const { fullName,email,password,address } = req.body;
    const userExits=await CustomerModel.findOne({email});
    if(userExits){
      return res.json({ message: "User already exists" });
    }
    else{
      const customeradata = new CustomerModel({
        fullName,
        email,
        password,
        address: arraypush(address),
      });
      await customeradata.save();
      return res.status(200).json({      
        Customer: customeradata,
      });
    }
    
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.findone = async (req, res, next) => {
  try {
    const findcustomer = await CustomerModel.find({ _id: req.body.id });

    if (!findcustomer) {
      return res.status(404);
    }
    res.status(200).json(findcustomer);
  } catch (err) {
    res.status(500).send(error);
  }
};
exports.findall = async (req, res, next) => {
  try {
    const findcustomer = await CustomerModel.find({});

    if (!findcustomer) {
      return res.status(404);
    }
    res.status(200).send(findcustomer);
  } catch (err) {
    res.status(500).send(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    console.log(req.body.password);
    const updatedata = await CustomerModel.findByIdAndUpdate(req.body.id, {
      fullName: req.body.fullName,
      password:req.body.password,          
      
      address: arraypush(address),
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
function arraypush(arr) {
  let arrdata = [];
  //console.log("address list",arr)
  for (list of arr) {
    arrdata.push(list);
  }
  //console.log("console ", list);
  return arrdata;
}
