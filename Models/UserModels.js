const Sequelize = require("sequelize");
const db = require("../Database/db");

module.exports = db.sequelize.define(
  "User",
  {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: 1,
      autoIncrement: 1,
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
    Username: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
    Created: {
      type: Sequelize.NOW,
    },
  },
  { timestamps: 0 }
);
