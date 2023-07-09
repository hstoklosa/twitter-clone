const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User.model");

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const user = await User.findOne({ email: profile.emails[0].value });

            if (!user) {
                const {
                    displayName,
                    provider,
                    id: providerId,
                    emails: [{ value: email }],
                    _json: { picture: profileImageURL, locale: location },
                } = profile;

                const newUser = await User.addGoogleUser({
                    username: "",
                    email,
                    provider,
                    providerId,
                    displayName,
                    dob: new Date("1997-01-01").toISOString().split("T")[0],
                    profileImageURL,
                    location,
                });

                return cb(null, newUser);
            }

            if (user.provider != "google") {
                return cb(null, false, {
                    message: `You have previously signed up with a different signin method`,
                });
            }

            // Sending back existing google user
            return cb(null, user);
        } catch (err) {
            cb(err);
        }
    }
);
