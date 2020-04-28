import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import IdentityController from "./API/Controllers/IdentityController";
import RestaurantController from "./API/Controllers/RestaurantController";
import UserController from "./API/Controllers/UserController";

const app = express();
let port = process.env.PORT || 5000;

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/identity", IdentityController);
app.use("/restaurant", RestaurantController);
app.use("/user", UserController);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
