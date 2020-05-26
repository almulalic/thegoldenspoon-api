import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import LookupsService from "../../Services/Lookup/LookupsService";

const LookupController = express.Router();

LookupController.use(cors());

LookupController.get("/FetchRestaurantTypes", Auth.Authorize(), (req, res) => {
  LookupsService.FetchRestaurantTypes(res);
});

LookupController.get(
  "/FetchRestaurantExperience",
  Auth.Authorize(),
  (req, res) => {
    LookupsService.FetchRestaurantExperience(res);
  }
);

LookupController.get(
  "/FetchResturantMealPeriod",
  Auth.Authorize(),
  (req, res) => {
    LookupsService.FetchRestaurantMealPeriod(res);
  }
);

LookupController.get(
  "/FetchResturantAvailability",
  Auth.Authorize(),
  (req, res) => {
    LookupsService.FetchRestaurantAvailability(res);
  }
);
export default LookupController;
