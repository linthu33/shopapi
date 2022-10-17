
const jwt = require("jsonwebtoken");
const CustomerModel = require("../models/Customer.model");
const taxModel = require("../models/tax.model");

module.exports = (app) => {
  const product_com = require("../contollers/product.com");
  const category_com = require("../contollers/category.controller");
  const fileupload = require("../contollers/fileupload.con");
  const orderproduct = require("../contollers/orderporoduct.controller");
  const customercon = require("../contollers/customer.con");
  const taxcon = require("../contollers/tax.controller");
  const sellercon = require("../contollers/seller.controller");
  const gluecon=require("../contollers/glue.controller");
  //#region User route

  app.post("/register", customercon.create);
  app.post("/login", async (req, res) => {
    const password=req.body.password;
    const email= req.body.email;
      //const { email, password } = req.body;
      const customer = await CustomerModel.findOne({
        email
      });
      //console.log(customeruser)
      if (!customer) {
        return res.json({ message: "User doesn't exist" });
      } else {
        //console.log(customeruser.password);
        if ( password !== customer.password) {
         
          return res.json({ message: "Password Incorrect" });
        }
        const payload = {
         
          customer 
      };
     // console.log(customeruser);
      jwt.sign(payload, "secret", (err, token) => {
          if (err) console.log(err);
          else return res.json({ token: token,customer });
      });
      }
    /* } catch (err) {
      return res.json({ message: err });
    } */
  });

  //#endregion

  //#region  upload image for product
  app.post("/uploadImage", fileupload.uploadImage);

  //#region Category Contoller
  app.post("/createcategory", category_com.create);
  app.get("/findOnecategory", category_com.findOne);
  app.get("/findAllcategory", category_com.findAll);
  app.get("/tax", taxcon.findAlltax);
  //#endregion
  //#region Product Contoller
  app.get("/findidprod/:id", product_com.findidprod);
  app.get("/findOneprod/:id", product_com.findOneprod);
  app.get("/findsubandtitleprod/:query", product_com.findsubandtitleprod);
  app.get("/sortprod/:query", product_com.sortprod);
  app.get("/findAllprod", product_com.findAllprod);
  app.post("/createprod", product_com.createprod);
  app.post("/editprod", product_com.updateprod);
  app.delete("/deleteprod/:id", product_com.deleteprod);
  app.get("/groupbybrand", product_com.GroupbyBarndprod);
  
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
  app.post("/glue",gluecon.create); 
  app.get("/glueFindAll", gluecon.findAll);
 
};
