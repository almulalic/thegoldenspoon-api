const Sequelize = require("sequelize");
const db = {} as any;

require("dotenv").config();

let sequelize = new Sequelize(
  process.env.DATABASE_TABLE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
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
