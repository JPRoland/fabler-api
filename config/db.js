require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
  },
  test: {
    username: process.env.TESTDB_USER,
    password: process.env.TESTDB_PASS,
    database: process.env.TESTDB_NAME,
    host: process.env.TESTDB_HOST,
    dialect: process.env.TESTDB_DIALECT,
    port: process.env.TESTDB_PORT
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
  }
};
