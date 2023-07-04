const passport = require("passport");
const localStrategy = require("./strategies/localStrategy");
const googleStrategy = require("./strategies/googleStrategy");
const User = require("../models/User.model");

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
    console.log(user);
    console.log("SERIALIZING USER");

    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    console.log("FINDING USER");

    const currentUser = await User.findOne({
        _id,
    });

    done(null, currentUser);
});

module.exports = passport;
