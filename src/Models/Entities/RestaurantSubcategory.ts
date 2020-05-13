import db from "../../DatabaseOld/DbModel";
import { RestaurantCategory } from "./RestaurantCategory";

const Sequelize = require("sequelize");

export const RestaurantSubcategory = db.sequelize.define(
  "restaurantsubcategory",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    categoryId: {
      type: Sequelize.INTEGER,
    },
    created: {
      type: Sequelize.DATE,
    },
    lastModified: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: 0,
    tableName: "restaurantsubcategory",
    freezeTableName: true,
  }
);

// RestaurantSubcategory.belongsTo(RestaurantCategory);
