// GLOBAL IMPORT

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.ts");

// INITIAL DEFINITION
const app = express();
const port = process.env.PORT || 5000;

// INITIALIZATION
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CONTROLLERS IMPORT
const IdentitiesController = require("./Controllers/IdentityController");

// ACCESS POINTS
app.use("/users", IdentitiesController);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
