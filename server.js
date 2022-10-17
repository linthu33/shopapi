const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dbconfig = require("./config/db");
require("dotenv").config();
const app = express();
// Configuring the database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//process.env.MONGODB_URI
mongoose
  .connect(dbconfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
// parse requests of content-type - application/x-www-form-urlencoded
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
//#region  Route
require("./routes/routes")(app);
//#endregion
const PORT = process.env.PORT || 3000;
// Have Node serve the files for our built React app
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});
//build production or hosting  အတွက် ဖြစ်ပါတယ်။
/* if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
} */

// listen for requests
const IP = "192.168.25.29";
app.listen(PORT, () => {
  console.log("Server is listening on port ", PORT);
});
