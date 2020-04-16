import db from "../../Database/DbModel";
import Identity from "./Identity";

const Sequelize = require("sequelize");

const User = db.sequelize.define(
  "user",
  {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: Sequelize.STRING,
    },
    LastName: {
      type: Sequelize.STRING,
    },
    BornOn: {
      type: Sequelize.DATE,
    },
    Country: {
      type: Sequelize.DATE,
    },
    Adress: {
      type: Sequelize.DATE,
    },
    IdentityId: {
      type: Sequelize.INTEGER,
    },
    Avatar: {
      type: Sequelize.STRING,
    },
    Role: {
      type: Sequelize.INTEGER,
    },
    Created: {
      type: Sequelize.DATE,
    },
    LastModified: {
      type: Sequelize.NOW,
    },
    IsConfirmed: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: 0,
    tableName: "user",
    freezeTableName: true,
  }
);

User.belongsTo(Identity);

export default User;
