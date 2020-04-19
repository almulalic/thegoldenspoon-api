import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { Auth } from "../../Auth/Auth";
import Restaurant from "../../Models/Entities/Restaurant";
import RestaurantCategory from "../../Models/Entities/RestaurantCategory";
import RestaurantSubcategory from "../../Models/Entities/RestaurantSubcategory";

const RestaurantController = express.Router();

RestaurantController.use(cors());

RestaurantController.get("/fetchRestaurants", (req, res) => {
  Restaurant.findAll().then((resp) => {
    res.json(resp);
  });
});

RestaurantController.get("/fetchCategories", (req, res) => {
  RestaurantCategory.findAll().then((resp) => {
    res.json(resp);
  });
});

RestaurantController.get("/fetchSubcategories", (req, res) => {
  RestaurantSubcategory.findAll().then((resp) => {
    res.json(resp);
  });
});

export default RestaurantController;
