const GoogleStrategy = require("passport-google-oauth20").Strategy;

const userService = require("../../services/user.service");
const authService = require("../../services/auth.service");

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, cb) => {
        try {
            const user = await userService.findByIdentifier(
                profile.emails[0].value,
                { select: "id username displayName profileImageURL provider email" }
            );

            if (!user) {
                const {
                    id,
                    provider,
                    displayName,
                    emails: [{ value: email }],
                    _json: { picture: profileImageURL },
                } = profile;

                const data = {
                    provider: {
                        providerId: id,
                        providerName: provider,
                    },
                    displayName,
                    email,
                    profileImageURL,
                }

                // create the google user
                return cb(null, await authService.createGoogleUser(data));
            }

            // users exists with a different provider
            if (user.provider?.providerName != "google") {
                return cb(null, false, {
                    message: `You have previously signed up with a different sign-in method`,
                });
            }

            return cb(null, user);
        } catch (err) {
            cb(err);
        }
    }
);
