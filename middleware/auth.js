const jwt = require("jsonwebtoken");
const fs = require("fs");
module.exports = async function isAuthenticated(req, res, next) {
  console.log(req.headers["authorization"]);
  const token = req.headers["authorization"].split(" ")[1];

  const apikey = fs.readFileSync("./key.file", "utf8");

  jwt.verify(token, apikey, (err, user) => {
    if (err) {
      return res.json({ message: "please comfirm your api key " });
    } else {
      req.user = user;
      next();
    }
  });
};
