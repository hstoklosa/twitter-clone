const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User.model");

module.exports = new LocalStrategy(
    {
        usernameField: "identifier",
        passwordField: "password",
    },
    async (identifier, password, cb) => {
        try {
            const user = await User.findOne({
                $or: [{ username: identifier }, { email: identifier }],
            });

            if (!user) {
                return cb(null, false, {
                    message: `User with identifier ${identifier} does not exist.`,
                });
            }

            if (user.provider != "local") {
                return cb(null, false, {
                    message:
                        "You have previously signed up with a different method.",
                });
            }

            const passwordMatch = bcrypt.compareSync(password, user.password);

            if (!passwordMatch) {
                return cb(null, false, {
                    message: `The provided password is incorrect!`,
                });
            }

            return cb(null, user);
        } catch (err) {
            cb(err);
        }
    }
);
