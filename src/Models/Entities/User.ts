import db from "../../DatabaseOld/DbModel";
import { Identity } from "./Identity";
import { Country } from "./Country";

const Sequelize = require("sequelize");

export const User = db.sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    bornOn: {
      type: Sequelize.DATE,
    },
    countryId: {
      type: Sequelize.STRING,
    },
    adress: {
      type: Sequelize.DATE,
    },
    identityId: {
      type: Sequelize.INTEGER,
    },
    avatar: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.INTEGER,
    },
    created: {
      type: Sequelize.DATE,
    },
    lastModified: {
      type: Sequelize.NOW,
    },
  },
  {
    timestamps: 0,
    tableName: "user",
    freezeTableName: true,
  }
);

User.belongsTo(Identity, { foreignKey: "identityId" });
User.belongsTo(Country, { foreignKey: "countryId" });
