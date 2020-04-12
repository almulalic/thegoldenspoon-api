// GLOBAL IMPORT

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

// INITIAL DEFINITION

const app = express();
const port = process.env.PORT || 5000;

// INITIALIZATION

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// CONTROLLERS IMPORT

const UsersController = require("./Controllers/UserControllers");

app.use("/users", UsersController);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
