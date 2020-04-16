const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize("goldspoon", "goldspoon", "ys63w447YHvOlWq4", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
