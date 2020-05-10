import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import LeaderbordService from "../../Services/LeaderbordService/LeaderbordService";

const LeaderboardController = express.Router();

LeaderboardController.use(cors());

LeaderboardController.get(
  "/fetchOverallLeaderbord",
  Auth.Authorize(),
  (req, res) => {
    LeaderbordService.FetchOverallLeaderboard(req, res);
  }
);

export default LeaderboardController;
