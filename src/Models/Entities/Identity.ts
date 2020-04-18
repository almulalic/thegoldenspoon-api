import db from "../../Database/DbModel";

const Sequelize = require("sequelize");

const Identity = db.sequelize.define(
  "identity",
  {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
    IsConfirmed: {
      type: Sequelize.BOOLEAN,
    },
    ConfirmedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: 0,
    tableName: "identity",
    freezeTableName: true,
  }
);

export default Identity;
