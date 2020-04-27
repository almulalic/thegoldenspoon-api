import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import RestaurantsService from "../../Services/RestaurantService/RestaurantsService";

const RestaurantController = express.Router();

RestaurantController.use(cors());

RestaurantController.get("/fetchCategories", (req, res) => {
  RestaurantsService.FetchCategories(res);
});

RestaurantController.get("/fetchExpandedCategories", (req, res) => {
  RestaurantsService.FetchExpandedCategories(res);
});

RestaurantController.get("/fetchSubcategories", (req, res) => {
  RestaurantsService.FetchSubcategires(res);
});

RestaurantController.get("/fetchRestaurants", (req, res) => {
  RestaurantsService.FetchRestaurants(res);
});

RestaurantController.get("/fetchUserRecord/:id", (req, res) => {
  RestaurantsService.FetchUserRecord(req.params.id, res);
});

RestaurantController.post(
  "/updateRestaurantRecord",
  Auth.Authorize(),
  (req, res) => {
    RestaurantsService.UpdateRestaurantRecord(req, res);
  }
);

export default RestaurantController;
