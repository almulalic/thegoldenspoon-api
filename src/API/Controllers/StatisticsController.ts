import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import StatisticsService from "../../Services/StatisticsService/StatisticsService";

const StatisticsController = express.Router();

StatisticsController.use(cors());

StatisticsController.get(
  "/fetchUserStatistics",
  Auth.Authorize(),
  (req, res) => {
    StatisticsService.FetchUserStatistics(req, res);
  }
);

StatisticsController.get(
  "/fetchUserStatistics/:uid",
  Auth.Authorize(),
  (req, res) => {
    StatisticsService.FetchUserStatistics(req, res);
  }
);

StatisticsController.post(
  "/fetchStatisticsByDate",
  //   Auth.Authorize(),
  (req, res) => {
    StatisticsService.FetchStatisticsByDate(req, res);
  }
);

export default StatisticsController;
