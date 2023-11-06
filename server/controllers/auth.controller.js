const bcrypt = require("bcrypt");
const crypto = require("crypto");
const passport = require("../config/passportConfig");
const { transporter } = require("../config/nodemailer");

const User = require("../models/User.model");
const asyncHandler = require("../middlewares/asyncHandler");
const {
    BadRequestError,
    ConflictError,
    InternalServerError,
    UnauthenticatedError,
} = require("../utils/errors");

const checkIdentifier = asyncHandler(async (req, res, next) => {
    const { identifier } = req.params;

    const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    });

    return res.status(200).json({
        exists: user ? true : false,
    });
});

const confirmEmail = asyncHandler(async (req, res, next) => {
    const { email: targetEmail } = req.params;
    const code = crypto.randomBytes(3).toString("hex");

    const options = {
        to: targetEmail,
        from: '"Twitter Clone" <' + process.env.MAIL_USER + ">",
        subject: "Email Verification",
        text: "Thanks for giving my app a try! \nYour verification code is: " + code,
    };

    const response = await transporter.sendMail(options);

    if (response.accepted.includes(targetEmail))
        return next(new InternalServerError("Something went wrong!"));

    return res.status(200).json({
        code,
    });
});

const signUp = asyncHandler(async (req, res, next) => {
    const { displayName, dob, username, email, password } = req.body;

    if (!displayName || !email || !dob || !password || !username) {
        return next(new BadRequestError("Provide all the required fields!"));
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.addUser({
            displayName,
            dob,
            username,
            email,
            password: hashedPassword,
            profileImageURL: "http://localhost:8080/uploads/default_pfp.png",
        });

        req.login(newUser, (err) => {
            if (err) {
                return next(new InternalServerError());
            }

            return res.json({
                isAuthenticated: true,
                data: {
                    id: newUser._id,
                    username: newUser.username,
                },
            });
        });
    } catch (err) {
        if (err.code === 11000) {
            return next(new ConflictError("User with the provided username/email already exists!"));
        }
    }
});

const signIn = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) next(new InternalServerError()); // local strategy error

        if (!user) next(new BadRequestError(info.message)); // no user error

        req.logIn(user, (err) => {
            if (err) next(new InternalServerError()); // error while establishing session

            return res.status(200).json({
                isAuthenticated: true,
                data: {
                    id: user._id,
                    username: user.username,
                },
            });
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) next(new InternalServerError());

        return res.json({
            isAuthenticated: false,
        });
    });
};

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            isAuthenticated: true,
            data: {
                id: req.user._id,
                username: req.user.username,
            },
        });
    }

    return next(new UnauthenticatedError("You are not authenticated!"));
};

module.exports = {
    checkIdentifier,
    confirmEmail,
    signUp,
    signIn,
    logout,
    isAuth,
};
