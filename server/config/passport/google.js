const GoogleStrategy = require("passport-google-oauth20").Strategy;

const userService = require("../../services/user.service");
const authService = require("../../services/auth.service");

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const user = await userService.findByIdentifier(
                profile.emails[0].value,
                { select: "id username displayName profileImageURL provider" }
            );

            if (!user) {
                const {
                    id,
                    provider,
                    displayName,
                    emails: [{ value: email }],
                    _json: { picture: profileImageURL, locale: location },
                } = profile;

                // create the google user
                const newUser = await authService.createGoogleUser({
                    provider: {
                        providerName: provider,
                        providerId: id,
                    },
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
