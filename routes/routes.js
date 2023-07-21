
const jwt = require("jsonwebtoken");
const CustomerModel = require("../models/Customer.model");


module.exports = (app) => {
  const product_com = require("../contollers/product.com");
  const category_com = require("../contollers/category.controller");
  const fileupload = require("../contollers/fileupload.con");
  const orderproduct = require("../contollers/orderporoduct.controller");
  const customercon = require("../contollers/customer.con");

  const sellercon = require("../contollers/seller.controller");
  
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
        return res.json({ loginResult: {token:"",customer:""} });
      } else {
        //console.log(customeruser.password);
        if ( password !== customer.password) {
         
          return res.json({ loginResult: {token:"",customer:""} });
        }
        const payload = {
         
          customer 
      };
     // console.log(customeruser);
      jwt.sign(payload, "secret", (err, token) => {
          if (err) console.log(err);
         // else return res.json({  token: token,customer });
         else return res.json({ loginResult: {token:token,customer:customer} })
      });
      }
    /* } catch (err) {
      return res.json({ message: err });
    } */
  });

  //#endregion

  //#region  upload image for product
  app.post("/uploadepub", fileupload.uploadepub);

  //#region Category Contoller
  //#region Category Contoller
  app.post("/createcategory", category_com.create);
  app.get("/findOnecategory", category_com.findOne);
  app.get("/findAllcategory", category_com.findAll);

  //#endregion
  //#region Product Contoller
  app.get("/findidprod/:id", product_com.findidprod);
  app.get("/findOneprod/:id", product_com.findOneprod);
  app.post("/search", product_com.searchany);
  app.get("/findsubandtitleprod/:query", product_com.findsubandtitleprod);
  app.post("/sortprod", product_com.sortprod);
  app.get("/newarrivel", product_com.newarrivel);
  app.post("/findAllprod", product_com.findAllprod);
  app.post("/createprod", product_com.createprod);
  app.post("/editprod", product_com.updateprod);
  app.delete("/deleteprod/:id", product_com.deleteprod);
  app.get("/groupbybrand", product_com.GroupbyBarndprod); 
  app.post("/findcategory", product_com.find_sub_category);
  app.post("/authorPro", product_com.authorPro);
  app.post("/authorsearch", product_com.authorsearchany);
  app.post("/updatepro", product_com.updateprod);
  app.post("/cutomerdownlist", product_com.cutomerProductlist);
  app.post("/cutomerrecentlist", product_com.cutomerrecentlist);
  app.post("/commentupdate", product_com.updateComment);
  app.get("/themostpopular", product_com.findthemostpopular);

  
  
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
  app.post("/recentupdate", customercon.recentupdate);
  app.post("/downloadupdate", customercon.downloadupdate);
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
