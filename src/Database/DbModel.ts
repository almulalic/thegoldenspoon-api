const Sequelize = require("sequelize");
const db = {} as any;

let sequelize = new Sequelize(
  "thegoldenspoon",
  "goldspoon",
  "ys63w447YHvOlWq4",
  {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
