// GLOBAL IMPORT
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import swaggerUi from "swagger-ui-express";
// const swaggerDocument = require("../swagger.ts");

// CONTROLLERS IMPORT
import IdentityController from "./API/Controllers/IdentityController";
import RestaurantController from "./API/Controllers/RestaurantController";

// INITIAL DEFINITION
const app = express();
const port = process.env.PORT || 5000;

// INITIALIZATION
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ACCESS POINTS
app.use("/identity", IdentityController);
app.use("/restaurant", RestaurantController);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
