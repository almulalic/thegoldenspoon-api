import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";

import IdentityController from "./API/Controllers/IdentityController";
import RestaurantController from "./API/Controllers/RestaurantController";
import UserController from "./API/Controllers/UserController";
import StatisticsController from "./API/Controllers/StatisticsController";
import LeaderboardController from "./API/Controllers/LeaderboardController";

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

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers[0]);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
