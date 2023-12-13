const passport = require("passport");

const User = require("../models/User.model");
const localStrategy = require("./passport/local");
const googleStrategy = require("./passport/google");

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    done(
        null,
        await User.findById(id).select("_id username displayName profileImageURL")
    );
});

module.exports = passport;
