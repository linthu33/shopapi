const jwt = require("jsonwebtoken");
const CustomerModel = require("../models/Customer.model");
const isauth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const isAuthor = require("../middleware/author");
const isCustomer = require("../middleware/customer");
module.exports = async (app) => {
  const product_com = require("../contollers/product.com");
  const category_com = require("../contollers/category.controller");
  const fileupload = require("../contollers/fileupload.con");
  const orderproduct = require("../contollers/orderporoduct.controller");
  const customercon = require("../contollers/customer.con");
  const sellercon = require("../contollers/seller.controller");
  //#region User route
  app.post("/register", customercon.create);
  app.post("/login", async (req, res) => {
    try {
      // Get user input
      console.log(req.body);
      const { email, password } = req.body;
      // Validate user input
      if (!(email && password)) {
        return res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await CustomerModel.findOne({ email });

      if (user) {
        // Create token
        const token = jwt.sign({ user_id: user._id, role: user.role }, "koko", {
          expiresIn: "5h",
        });

        // user
        return res.status(200).json({ token: token ,user:user});
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      return res.status(400).json({
        error: "Missing password",
      });
    }
  });

  //#endregion

  //#region  upload image for product
  app.post("/uploadImage", fileupload.uploadImage);

  //#region Category Contoller
  //#region Category Contoller
  app.post("/createcategory", category_com.create);
  app.get("/findOnecategory", category_com.findOne);
  app.get("/findAllcategory", category_com.findAll);
  app.post("/findcategory", product_com.find_sub_category);
  //#endregion
  //#region Product Contoller
  app.get("/findidprod/:id", product_com.findidprod);
  app.get("/findOneprod/:id", product_com.findOneprod);
  app.get("/search", product_com.searchany);
  app.get("/findsubandtitleprod/:query", product_com.findsubandtitleprod);
  app.get("/sortprod", product_com.sortprod);
  app.get("/newarrivel", product_com.newarrivel);
  await app.get("/findAllprod", product_com.findAllprod);
  app.post("/createprod", product_com.createprod);
  app.post("/editprod", product_com.updateprod);
  app.delete("/deleteprod/:id", product_com.deleteprod);
  app.get("/groupbybrand", product_com.GroupbyBarndprod);
  app.post("/oldupdate", product_com.oldprodupdate);
  //#endregion
  //#region Order to Product Route
  app.post("/orderproduct", orderproduct.orcreate);
  app.get("/orderfindone", orderproduct.orfindone);
  app.get("/orderfindall", orderproduct.orfindall);
  app.get("/orderfindstatus", orderproduct.orfindstatus);
  app.delete("/orderdelete", orderproduct.ordelete);
  /*  app.post('/opupdate',orderproduct.opupdate);
   */
  //#endregion
  //#region Customer

  app.get("/customerfind", customercon.findone);
  app.get("/customerfindall", customercon.findall);

  app.post("/customerupdate", customercon.update);
  /*  app.post('/opupdate',orderproduct.opupdate);
   */
  //#endregion
  app.get("/sellerall", sellercon.depFindall);
  app.get("/sellerone/:query", sellercon.depFindone);
  app.post("/sellercreate", sellercon.depCreate);
  app.post("/sellerUpdate", sellercon.depUpdate);
  app.get("/sellerdelete/:id", sellercon.depDelete);
  //for glue
};
