import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import Restaurant from "../../Models/Entities/Restaurant";
import RestaurantCategory from "../../Models/Entities/RestaurantCategory";
import RestaurantSubcategory from "../../Models/Entities/RestaurantSubcategory";
import Auth from "../../Auth/Auth";

const RestaurantController = express.Router();

RestaurantController.use(cors());

RestaurantController.get("/fetchCategories", Auth.Authorize(), (req, res) => {
  RestaurantCategory.findAll().then((resp) => {
    res.json(resp);
  });
});

RestaurantController.get(
  "/fetchSubcategories",
  Auth.Authorize(),
  (req, res) => {
    RestaurantSubcategory.findAll().then((resp) => {
      res.json(resp);
    });
  }
);

RestaurantController.get("/fetchRestaurants", Auth.Authorize(), (req, res) => {
  Restaurant.findAll().then((resp) => {
    res.json(resp);
  });
});

export default RestaurantController;
