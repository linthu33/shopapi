const GlueModel = require("../models/glue.model");

exports.create =async (req, res) => {
  console.log(req.body);
  const glue = new GlueModel({
    date: req.body.date, // s m
    openbalance: req.body.openbalance, //15000 2000
    afterstirglue: req.body.afterstirglue,
    issue: req.body.issue,
    returnglue: req.body.returnglue, //100 100
    produceglue: req.body.produceglue, //50 0
    totalglue: req.body.totalglue,
    productId: "123314134",
  });
  glue
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error",
      });
    });
};

exports.findAll = (req, res, next) => {
  GlueModel.find({}).exec(function (err, data) {
    if (err)
      return res.status(500).send({
        message: err.message,
      });
    res.status(200).json({ Glue: data });
  });
};
