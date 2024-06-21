const { Error } = require("mongoose");
const passport = require("../config/passport");
const User = require("../models/User.model");
const EmailToken = require("../models/EmailToken.model");

const asyncHandler = require("../middlewares/asyncHandler");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");

const { isObjEmpty } = require("../utils/object");
const pick = require("../utils/pick");

const {
    BadRequestError,
    ConflictError,
    InternalServerError,
    UnauthenticatedError,
} = require("../utils/errors");


const checkIdentifier = asyncHandler(async (req, res, next) => {
    const query = pick(req.query, ["username", "email", "identifier"]);

    if (isObjEmpty(query))
        return next(new BadRequestError("Invalid query parameters!"));

    let userStatus = false;
    const { identifier } = req.params;

    if (query.identifier && await User.exists({
        $or: [{ username: identifier }, { email: identifier }]
    })) {
        userStatus = true;
    }

    if (query.username && await User.exists({ username: identifier }))
        userStatus = true;

    if (query.email && await User.exists({ email: identifier }))
        userStatus = true;

    return res.status(200).json({
        exists: userStatus,
    });
});


const signUp = asyncHandler(async (req, res, next) => {
    const { displayName, username, email, password } = req.body;

    if (!displayName || !email || !password || !username)
        return next(new BadRequestError("Provide all of the required fields!"));

    try {
        const user = await authService.createLocalUser({
            displayName,
            username,
            email,
            password,
            profileImageURL: `${process.env.API_URL}/uploads/default_pfp.png`,
        });

        await authService.sendConfirmationEmail(user._id, user.email);

        return res.status(200).json({
            isAuthenticated: true,
            id: user._id,
        });
    } catch (err) {
        if (err.errors?.['username'] instanceof Error.ValidatorError) {
            return next(new BadRequestError(err.errors['username']));
        }

        if (err.errors?.['displayName'] instanceof Error.ValidatorError) {
            return next(new BadRequestError(err.errors['displayName']));
        }

        if (err.errors?.['email'] instanceof Error.ValidatorError) {
            return next(new BadRequestError(err.errors['email']));
        }

        if (err.errors?.['password'] instanceof Error.ValidatorError) {
            return next(new BadRequestError(err.errors['password']));
        }

        if (err.code === 11000)
            return next(new ConflictError(
                "User with the provided username/email already exists!"
            ));

        return next(err);
    }

});

const verifyToken = asyncHandler(async (req, res, next) => {
    const { id, code: codeParam } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user)
        return next(new BadRequestError("The user doesn't exist!"));

    const token = await EmailToken.findOne({
        userId: user._id,
        code: codeParam,
    });


    if (!token)
        return next(new BadRequestError("The token doesn't exist or has expired!"));

    await EmailToken.findByIdAndRemove(token._id);
    await User.findByIdAndUpdate(user._id, { verified: true });

    req.login(user, (err) => {
        if (err) return next(new InternalServerError());

        return res.status(200).json({
            isAuthenticated: true
        });
    });

});


const signIn = (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        if (err) return next(new BadRequestError(info.message)); // local strategy error
        if (!user) return next(new BadRequestError(info.message)); // no user error


        if (!user.verified) {
            await authService.sendConfirmationEmail(user._id, user.email);

            return res.status(200).json({
                id: user._id,
                isEmailVerified: false
            })
        }


        req.logIn(user, (err) => {
            if (err) return next(new InternalServerError()); // error while establishing session

            return res.status(200).json({ isAuthenticated: true });
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
    if (req.user)
        return res.status(200).json({
            isAuthenticated: true,
            data: req.user,
        });

    return next(new UnauthenticatedError("You are not authenticated!"));
};


module.exports = {
    checkIdentifier,
    signUp,
    signIn,
    verifyToken,
    logout,
    isAuth,
};
