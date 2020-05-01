import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import RestaurantsService from "../../Services/RestaurantService/RestaurantsService";

const RestaurantController = express.Router();

RestaurantController.use(cors());

RestaurantController.get("/fetchCategories", Auth.Authorize(), (req, res) => {
  RestaurantsService.FetchCategories(res);
});

RestaurantController.get(
  "/fetchSubcategories",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.FetchSubcategires(res);
  }
);

RestaurantController.get("/fetchRestaurants", Auth.Authorize(), (req, res) => {
  RestaurantsService.FetchRestaurants(res);
});

RestaurantController.get(
  "/fetchUserRecord/:username",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.FetchUserRecord(req, res);
  }
);

RestaurantController.get("/fetchUserRecord", Auth.Authorize(), (req, res) => {
  RestaurantsService.FetchUserRecord(req, res);
});

RestaurantController.post(
  "/updateRestaurantRecord",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.UpdateRestaurantRecord(req, res);
  }
);

RestaurantController.get(
  "/fetchUserStatistics/:uid",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.FetchUserStatistics(req, res);
  }
);

RestaurantController.get(
  "/fetchUserStatistics",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.FetchUserStatistics(req, res);
  }
);

export default RestaurantController;
