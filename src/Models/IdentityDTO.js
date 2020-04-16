const Sequelize = require("sequelize");
const db = require("../Database/db");

const IdentityDTO = db.sequelize.define(
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
  },
  {
    timestamps: 0,
    tableName: "identity",
    freezeTableName: true,
  }
);

module.exports = IdentityDTO;
