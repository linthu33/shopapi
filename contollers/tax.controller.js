const taxModel = require("../models/tax.model");

exports.create = (req, res) => {

  
  const tax = new taxModel({
    tax: req.body.tax,
  
  });
  tax
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error",
      });
    });
};

exports.findAlltax= (req, res, next) => {
    taxModel.find()
    
      .exec(function (err, data) {
        if (err)
          return res.status(500).send({
            message: err.message,
          });
        res.status(200).json({ tax: data });
      });
  };