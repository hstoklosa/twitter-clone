const passport = require("passport");
const localStrategy = require("./strategies/localStrategy");
const googleStrategy = require("./strategies/googleStrategy");
const User = require("../models/User.model");

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
    console.log("SERIALIZING USER");
    console.log(user);

    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const currentUser = await User.findOne({
        _id: id,
    });

    console.log("DESERIALIZING USER");
    console.log(currentUser);

    const { _id, displayName, dob, username, email, profileImageURL, bio, location, followers, following, createdAt } = currentUser;

    done(null, {
        _id,
        displayName,
        dob,
        username,
        email,
        profileImageURL,
        bio,
        location,
        followers,
        following,
        createdAt,
    });
});

module.exports = passport;
