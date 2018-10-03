require("dotenv").config();

const CONFIG = {};

CONFIG.port = process.env.PORT || 3001;
CONFIG.app_env = process.env.APP_ENV;

CONFIG.jwt_secret = process.env.JWT_SECRET;

module.exports = CONFIG;
