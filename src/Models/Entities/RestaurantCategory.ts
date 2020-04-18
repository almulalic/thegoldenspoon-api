import db from "../../Database/DbModel";

const Sequelize = require("sequelize");

const RestaurantCategory = db.sequelize.define(
  "restaurantcategory",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
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
    tableName: "restaurantcategory",
    freezeTableName: true,
  }
);

// Restaurant.belongsTo(RestaurantSubcategory);
// Restaurant.belongsTo(RestaurantCategory);

export default RestaurantCategory;
