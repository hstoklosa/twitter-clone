const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User.model");
const { transporter } = require("../config/nodemailer");
const passport = require("../config/passportConfig");
const CustomError = require("../config/CustomError");

const addLocalUser = (data) => {
    const user = new User({
        username: data.username,
        email: data.email,
        password: data.hashedPassword,
        provider: "local",
        providerId: "",
        displayName: data.displayName,
        bio: "",
        profileImageURL: data.profileImageURL,
        location: "",
    });

    return user.save();
};

const checkIdentifier = async (req, res, next) => {
    const { identifier } = req.params;

    const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    });

    return res.json({ exists: user ? true : false });
};

const confirmEmail = async (req, res, next) => {
    const { email } = req.params;
    const code = crypto.randomBytes(3).toString("hex");

    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Twitter Clone: EMAIL VERIFICATION",
            text: "Thanks for registering on my clone! Your verification code is: " + code,
        });
    } catch (err) {
        return res.status(400).json({ error: true, message: err.message });
    }

    return res.status(200).json({ code });
};

const signUp = async (req, res, next) => {
    const {
        displayName,
        username = "",
        email,
        password,
        profileImageURL = "https://lh3.googleusercontent.com/a/AAcHTtcmDL2ohQjMDbM2iT2wQR7HVKnA6hPCZltup3GLbLF4=s96-c",
    } = req.body;

    if (!displayName || !username || !email || !password) {
        return next(new CustomError(400, "Missing/invalid data."));
    }

    if (password.length < 8) {
        return next(new CustomError(400, "Password must be at least 8 characters long."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await addLocalUser({
            username,
            email,
            hashedPassword,
            displayName,
            profileImageURL,
        });
    } catch (err) {
        if (err.code === 11000) {
            return next(new CustomError(400, "User with the provided username/email already exists!"));
        }

        return next(err);
        //   return next(new CustomError(400, err.message));
    }

    return res.json({
        auth: true,
        user: {
            displayName,
            username,
            email,
            profileImageURL,
        },
        message: "Successfully signed up!",
    });
};

const signIn = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        // Authentication failed
        if (!user) {
            return next(new CustomError(400, info.message));
            // return res.status(400).json({ message: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const { username, email, displayName, bio, profileImageURL, location } = user;

            // Successful authentication
            return res.status(200).json({
                auth: true,
                user: {
                    displayName,
                    username,
                    email,
                    bio,
                    profileImageURL,
                    location,
                },
                message: "Successfully logged in!",
            });
        });
    })(req, res, next);
};

const googleCallback = (req, res, next) => {
    return res.status(200).json({ auth: true, user: req.user, message: "Successfully logged in!" });
};

const logout = (req, res) => {
    req.logout();
};

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({ message: "You're not logged in" });
};

module.exports = {
    addLocalUser,
    checkIdentifier,
    confirmEmail,
    signUp,
    signIn,
    googleCallback,
    logout,
    isAuth,
};
