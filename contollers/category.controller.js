const CategortModel = require("../models/categories.model");

exports.create = (req, res) => {
  //console.log("category lenght", req.body.subcategory.length);
  let subcat = [];
  for (list of req.body.subcategory) {
    subcat.push(list);
    console.log("console ", list.sublabel[0]);
  }
  const category = new CategortModel({
    maincategory: req.body.maincategory,
    subcategory: subcat,
  });
  category
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

exports.findOne = (req, res) => {
  try {
    var categoryseach = CategortModel.findOne(
      { maincategory: req.body.maincategory },

      function (err, data) {
        if (err) return res.status(500).send(err);
        res.status(200).send(data);
      }
    );
    console.log("Search data", categoryseach);
  } catch (err) {
    console.log("Search data", err);
  }
};
exports.findAll = (req, res) => {
  try {
    var categoryseach = CategortModel.find(
      {},

      function (err, data) {
        if (err) return res.status(500).send(err);
        res.status(200).send(data);
      }
    );
    console.log("Search data", categoryseach);
  } catch (err) {
    console.log("Search data", err);
  }
};
