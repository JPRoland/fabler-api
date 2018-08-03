require("dotenv").config();

const CONFIG = {};

CONFIG.port = process.env.PORT || 3000;
CONFIG.app_env = process.env.APP_ENV;

CONFIG.db_host = process.env.DB_HOST;
CONFIG.db_dialect = process.env.DB_DIALECT;
CONFIG.db_port = process.env.DB_PORT;
CONFIG.db_name = process.env.DB_NAME;
CONFIG.db_user = process.env.DB_USER;
CONFIG.db_pass = process.env.DB_PASS;

module.exports = CONFIG;
