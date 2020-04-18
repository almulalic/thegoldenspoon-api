import db from "../../Database/DbModel";

const Sequelize = require("sequelize");

const Identity = db.sequelize.define(
  "identity",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    isConfirmed: {
      type: Sequelize.BOOLEAN,
    },
    confirmedAt: {
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
