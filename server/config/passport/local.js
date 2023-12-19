const LocalStrategy = require("passport-local").Strategy;
const authService = require("../../services/auth.service");
const userService = require("../../services/user.service");

module.exports = new LocalStrategy(
    {
        usernameField: "identifier",
        passwordField: "password",
    },
    async (identifier, password, cb) => {
        try {
            const user = await userService.findByIdentifier(identifier, {
                select: "id username password displayName profileImageURL verified email",
            });

            const { password: fetchedPassword, ...rest } = user;

            if (!user) {
                return cb(null, false, {
                    message: `User with identifier ${identifier} does not exist.`,
                });
            }

            if (user?.provider) {
                return cb(null, false, {
                    message:
                        "You have previously signed up with a different method.",
                });
            }

            const isPasswordValid = await authService.comparePassword(
                password,
                fetchedPassword
            );

            if (!isPasswordValid) {
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
