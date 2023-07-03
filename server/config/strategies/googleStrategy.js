const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User.model");

const addGoogleUser = (data) => {
    const user = new User({
        username: "",
        email: data.emails[0].value,
        password: "",
        provider: data.provider,
        providerId: data.id,
        displayName: data.displayName,
        bio: "",
        profileImageURL: data._json.picture,
        location: data._json.locale,
    });

    return user.save();
};

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log(profile.emails[0].value);

        const user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            const newUser = await addGoogleUser(profile);
            return cb(null, newUser);
        }

        if (user.provider != "google") {
            return cb(null, false, {
                message: `You have previously signed up with a different signin method`,
            });
        }
    }
);
