const bcrypt = require("bcrypt");
const crypto = require("crypto");
const passport = require("../config/passportConfig");
const CustomHttpError = require("../config/CustomHttpError");

const User = require("../models/User.model");
const { transporter } = require("../config/nodemailerConfig");

const checkIdentifier = async (req, res, next) => {
    const { identifier } = req.params;

    const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    });

    return res.status(200).json({
        exists: user ? true : false,
    });
};

const confirmEmail = async (req, res, next) => {
    const { email } = req.params;
    const code = crypto.randomBytes(3).toString("hex");

    try {
        await transporter.sendMail({
            from: '"Twitter Clone" <' + process.env.MAIL_USER + ">",
            to: email,
            subject: "Email Verification",
            text: "Thanks for giving my app a try! \nYour verification code is: " + code,
        });
    } catch (err) {
        return next(new CustomHttpError(400, err.message));
    }

    return res.status(200).json({
        code,
    });
};

const signUp = async (req, res, next) => {
    const { displayName, dob, username, email, password } = req.body;

    if (!displayName || !dob || !username || !email || !password) {
        return next(new CustomHttpError(400, "The provided information is invalid!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.addLocalUser({
            displayName,
            dob,
            username,
            email,
            password: hashedPassword,
            provider: "local",
            profileImageURL: "http://localhost:8080/default_pfp.png",
        });

        req.login(newUser, (err) => {
            if (err) {
                next(err);
            }

            return res.json({
                user: {
                    _id: newUser._id,
                    displayName,
                    dob,
                    username,
                    email,
                    profileImageURL: newUser.profileImageURL,
                    createdAt: newUser.createdAt,
                },
            });
        });
    } catch (err) {
        if (err.code === 11000) {
            return next(new CustomHttpError(400, "User with the provided username/email already exists!"));
        }

        return next(err);
    }
};

const signIn = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err); // server error
        }

        // Authentication failed
        if (!user) {
            return next(new CustomHttpError(400, info.message));
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err); // login error
            }

            const { _id, username, email, displayName, dob, bio, profileImageURL, location, followers, following, createdAt } = user;

            // Successful authentication
            return res.status(200).json({
                user: {
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
                },
            });
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        return res.json({
            success: true,
        });
    });
};

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            user: req.user,
        });
    }

    return next(new CustomHttpError(401, "You are not authenticated!"));
};

module.exports = {
    checkIdentifier,
    confirmEmail,
    signUp,
    signIn,
    logout,
    isAuth,
};
