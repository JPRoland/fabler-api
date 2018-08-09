const jwt = require("jsonwebtoken");
const moment = require("moment");
const { jwt_secret } = require("../config/config");

module.exports = user => {
  return jwt.sign(
    {
      sub: user.id,
      name: user.username,
      iat: moment().unix(),
      exp: moment()
        .add(1, "hour")
        .unix()
    },
    jwt_secret
  );
};
