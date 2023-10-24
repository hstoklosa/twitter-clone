const passport = require("passport");

const User = require("../models/User.model");
const localStrategy = require("./strategies/local");
const googleStrategy = require("./strategies/google");

const { userInfoSelector } = require("../helpers/select");

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
    console.log("SERIALIZING USER");

    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const currentUser = await User.findById(id, userInfoSelector);

    console.log("DESERIALIZING USER");
    done(null, currentUser);
});

module.exports = passport;
