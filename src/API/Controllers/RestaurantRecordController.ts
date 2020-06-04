import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import RestaurantRecordService from "../../Services/RestaurantRecord/RestaurantRecordService";

const RestaurantRecordController = express.Router();

RestaurantRecordController.use(cors());

RestaurantRecordController.get(
  "/fetchUserRecord",
  Auth.Authorize(),
  (req, res) => {
    RestaurantRecordService.FetchUserRecord(req, res);
  }
);

RestaurantRecordController.get(
  "/fetchUserRecord/:username",
  Auth.Authorize(),
  (req, res) => {
    RestaurantRecordService.FetchUserRecord(req, res);
  }
);

RestaurantRecordController.put(
  "/upsertRestaurantRecord",
  Auth.Authorize(),
  (req, res) => {
    RestaurantRecordService.UpsertRestaurantRecord(req, res);
  }
);

export default RestaurantRecordController;
