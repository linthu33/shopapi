const CustomerModel = require("../models/Customer.model");
exports.create = async (req, res, next) => {
  try {
    console.log(req.body)
    const { fullName,email,password,role,phone} = req.body;
    const userExits=await CustomerModel.findOne({email});
    if(userExits){
      return res.json({ message: "User already exists" });
    }
    else{
      const customeradata = new CustomerModel({
        fullName,
        email,
        password,
        phone,
        role,
        download:[],
        recent:[],
        //author: arraypush(author),
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
    console.log(req.body);
    const updatedata = await CustomerModel.findByIdAndUpdate(req.body.id, {
      fullName: req.body.fullName,
      password:req.body.password,          
      author:arraypush(req.body.author)
     // address: arraypush(address),
    }
    
    );
    return res.status(200).json({      
      Customer: updatedata,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.recentupdate = async (req, res) => {
  try {
    const add_recentlist = await CustomerModel.findByIdAndUpdate(
      { _id: req.body.id },
      //{ $push: { recent: req.body.recent } },
      { $push: { recent: {$each:req.body.recent}  } },
      { new: true }
    );
    res.status(200).json({ Customer: add_recentlist })
  } catch (error) {
    res.status(400).json({
      message: "do not sucessfully",
    });
  }
};
exports.downloadupdate = async (req, res) => {
  try {
    const downloadlist = await CustomerModel.findByIdAndUpdate(
      { _id: req.body.id },
     // { $push: { download: req.body.download } },
     { $push: { download: {$each:req.body.download}  } },
      { new: true }
    );
    res.status(200).json({ Customer: downloadlist })
  } catch (error) {
    res.status(400).json({
      
      message: "do not sucessfully",
    });
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
