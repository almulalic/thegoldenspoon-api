import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import RestaurantsService from "../../Services/Restaurant/RestaurantService";

const RestaurantController = express.Router();

RestaurantController.use(cors());

RestaurantController.get("/fetchCategories", Auth.Authorize(), (req, res) => {
  RestaurantsService.FetchCategories(res);
});

RestaurantController.get(
  "/fetchSubcategories",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.FetchSubcategories(res);
  }
);

RestaurantController.get("/fetchRestaurants", Auth.Authorize(), (req, res) => {
  RestaurantsService.FetchRestaurants(res);
});

RestaurantController.get(
  "/fetchNewRestaurants",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.FetchNewRestaraunts(res);
  }
);

RestaurantController.get(
  "/fetchRestaurant/:id",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.FetchRestaurant(req, res);
  }
);

RestaurantController.put("/addNewRestaurant", Auth.Authorize(), (req, res) => {
  RestaurantsService.AddNewRestaurant(req, res);
});

RestaurantController.put("/modifyRestaurant", Auth.Authorize(), (req, res) => {
  RestaurantsService.ModifyRestaurant(req, res);
});

RestaurantController.delete(
  "/removeRestaurant/:id",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.RemoveRestaurant(req, res);
  }
);

export default RestaurantController;
