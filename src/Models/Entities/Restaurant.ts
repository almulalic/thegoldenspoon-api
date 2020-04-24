import db from "../../Database/DbModel";

const Sequelize = require("sequelize");

export const Restaurant = db.sequelize.define(
  "restaurant",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    subcategoryId: {
      type: Sequelize.INTEGER,
    },
    categoryId: {
      type: Sequelize.INTEGER,
    },
    country: {
      type: Sequelize.STRING,
    },
    adress: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    created: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: 0,
    tableName: "restaurant",
    freezeTableName: true,
  }
);
