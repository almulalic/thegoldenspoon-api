import "reflect-metadata";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { createConnection } from "typeorm";

import UserController from "./API/Controllers/UserController";
import IdentityController from "./API/Controllers/IdentityController";
import RestaurantController from "./API/Controllers/RestaurantController";
import StatisticsController from "./API/Controllers/StatisticsController";
import LeaderboardController from "./API/Controllers/LeaderboardController";

createConnection()
  .then(async (connection) => {
    const app = express();
    let port = process.env.PORT || 5000;

    require("dotenv").config();

    app.use(bodyParser.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use("/user", UserController);
    app.use("/identity", IdentityController);
    app.use("/restaurant", RestaurantController);
    app.use("/statistics", StatisticsController);
    app.use("/Leaderboard", LeaderboardController);

    app.listen(port, async () => {
      console.log(
        "Successfully loaded Database table: " +
          connection.entityMetadatas[0].schema
      );
      console.log(
        "Last migration: " +
          connection.migrations[connection.migrations.length - 1].name
      );
      console.log("Server is running on port: " + port);
    });
  })
  .catch((error) => console.log(error));
