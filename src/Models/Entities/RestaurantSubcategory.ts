import db from "../../Database/DbModel";
import Restaurant from "./Restaurant";

const Sequelize = require("sequelize");

const RestaurantSubcategory = db.sequelize.define(
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

// RestaurantSubcategory.belongsTo(Restaurant);

export default RestaurantSubcategory;
