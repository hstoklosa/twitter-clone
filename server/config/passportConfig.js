const passport = require("passport");
const localStrategy = require("./strategies/localStrategy");
const googleStrategy = require("./strategies/googleStrategy");
const User = require("../models/User.model");

passport.serializeUser((user, done) => {
    console.log(user);

    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log(id);

    const currentUser = await User.findOne({
        id,
    });

    done(null, currentUser);
});

passport.use(localStrategy);
passport.use(googleStrategy);

module.exports = passport;
