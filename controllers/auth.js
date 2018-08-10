const {
  requireSignIn,
  requireAuth,
  authOptional
} = require("../services/passport");
const getTokenForUser = require("../helpers/token");

const signIn = (req, res) => {
  res.send({ token: getTokenForUser(req.user) });
};

module.exports = { signIn, requireSignIn, requireAuth, authOptional };
