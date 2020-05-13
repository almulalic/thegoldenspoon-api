import db from "../../DatabaseOld/DbModel";

const Sequelize = require("sequelize");

export const Country = db.sequelize.define(
  "country",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: 0,
    tableName: "country",
    freezeTableName: true,
  }
);
