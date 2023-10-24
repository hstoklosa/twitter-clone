const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User.model");

/**
 * Generate username based on email, or name
 *
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 *
 * @returns {string} the username
 */
const generateUsername = (email, firstName, lastName, id) => {
    let username = "";
    if (email) {
        username = email.split("@")[0];
    } else if (firstName && lastName) {
        username = `${firstName}${lastName}${generateRandomNumber()}`;
    } else if (id) {
        username = id;
    }
    return username.toLowerCase();
};

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

                const data = {
                    displayName: profile.displayName,
                    provider: profile.provider,
                    providerId: profile.id,
                };

                const newUser = await User.addUser({
                    username: generateUsername(email),
                    displayName,
                    email,
                    provider,
                    providerId,
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
