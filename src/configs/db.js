require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.NODE_ENV === "development" ? "matrimonial" : process.env.DB_NAME,
  process.env.NODE_ENV === "development" ? "istiaqahmed" : process.env.DB_USER,
  process.env.NODE_ENV === "development" ? "" : process.env.DB_PASSWORD,
  {
    host:
      process.env.NODE_ENV === "development"
        ? "localhost"
        : process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.NODE_ENV === "production",
    },
    logging: process.env.NODE_ENV === "development",

    retry: {
      match: [/Deadlock/i],
      max: 3, // Maximum rety 3 times
      backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    },
  },
  {
    define: {
      freezeTableName: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
