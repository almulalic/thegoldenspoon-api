import db from "../../Database/DbModel";
import { Restaurant } from "./Restaurant";
import { User } from "./User";

const Sequelize = require("sequelize");

export const UserRestaurantRecord = db.sequelize.define(
  "userRestaurantRecord",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    restaurantId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    isFavorite: {
      type: Sequelize.INTEGER,
    },
    dateVisited: {
      type: Sequelize.DATE,
    },
    comment: {
      type: Sequelize.STRING,
    },
    lastModified: {
      type: Sequelize.DATE,
    },
    created: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: 0,
    tableName: "userRestaurantRecord",
    freezeTableName: true,
  }
);

UserRestaurantRecord.belongsTo(Restaurant, { foreignKey: "restaurantId" });
UserRestaurantRecord.belongsTo(User, { foreignKey: "userId" });
