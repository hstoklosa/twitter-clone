const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User.model");

const generateUsername = require("../../helpers/generateUsername");

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
                    id,
                    provider,
                    displayName,
                    emails: [{ value: email }],
                    _json: { picture: profileImageURL, locale: location },
                } = profile;

                const generatedUsername = generateUsername(email);
                const customDob = new Date("1997-01-01").toISOString().split("T")[0];

                const newUser = await User.addUser({
                    provider: {
                        providerName: provider,
                        providerId: id,
                    },
                    username: generatedUsername,
                    displayName,
                    dob: customDob,
                    email,
                    profileImageURL,
                    location,
                });

                return cb(null, newUser);
            }

            // users exists with a different provider
            if (user.provider != "google") {
                return cb(null, false, {
                    message: `You have previously signed up with a different sign-in method`,
                });
            }

            // sending back existing google user
            return cb(null, user);
        } catch (err) {
            cb(err);
        }
    }
);
