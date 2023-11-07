const passport = require("passport");

const User = require("../models/User.model");
const localStrategy = require("./strategies/local");
const googleStrategy = require("./strategies/google");

const { userInfoSelector } = require("../helpers/selectors");

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    done(null, await User.findById(id, userInfoSelector));
});

module.exports = passport;
