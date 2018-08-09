const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const {ExtractJwt} = require("passport-jwt");
const {User} = require("../models");
const {jwt_secret} = require("../config/config");

const localOptions = {
  usernameField: "email"
};

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({where: {email: email}, attributes: {exclude: ['password']});
    if(!user) return done(null, false);
    const isMatch = user.comparePassword(password);
    if(!isMatch) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt_secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub, {attributes: {exclude: ['password']}});
    if(!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = {
  requireAuth: passport.authenticate("jwt", {session: false}),
  requireSignIn: passport.authenticate("local", {session: false})
};
