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

export default RestaurantController;
