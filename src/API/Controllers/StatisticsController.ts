import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import StatisticsService from "../../Services/Statistics/StatisticsService";

const StatisticsController = express.Router();

StatisticsController.use(cors());

StatisticsController.get(
  "/fetchUserStatistics",
  Auth.Authorize(),
  (req, res) => {
    StatisticsService.FetchUserStatistics(req, res);
  }
);

StatisticsController.post(
  "/fetchStatisticsByDate",
  Auth.Authorize(),
  (req, res) => {
    StatisticsService.FetchStatisticsByDate(req, res);
  }
);

StatisticsController.post(
  "/fetchUserCategoriesStatistics",
  Auth.Authorize(),
  (req, res) => {
    StatisticsService.FetchCategoriesStatistics(req, res);
  }
);

StatisticsController.get(
  "/fetchGoldenSpoonProgress",
  Auth.Authorize(),
  (req, res) => {
    StatisticsService.FetchGoldenSpoonProgress(req, res);
  }
);

StatisticsController.get(
  "/fetchGoldenSpoonProgress/:username",
  Auth.Authorize(),
  (req, res) => {
    StatisticsService.FetchGoldenSpoonProgress(req, res);
  }
);

export default StatisticsController;
