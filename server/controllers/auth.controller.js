const passport = require("../config/passport");
const asyncHandler = require("../middlewares/asyncHandler");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");

const {
    BadRequestError,
    ConflictError,
    InternalServerError,
    UnauthenticatedError,
} = require("../utils/errors");

const checkIdentifier = asyncHandler(async (req, res, next) => {
    const user = await userService.findByIdentifier(req.params.identifier);

    return res.status(200).json({
        exists: user ? true : false,
    });
});

const confirmEmail = asyncHandler(async (req, res, next) => {
    const response = await authService.sendConfirmationEmail(req.params.email);

    if (response.accepted.includes(targetEmail))
        return next(new InternalServerError("Something went wrong!"));

    return res.status(200).json({
        code,
    });
});

const signUp = asyncHandler(async (req, res, next) => {
    const { displayName, dob, username, email, password } = req.body;

    if (!displayName || !email || !dob || !password || !username) {
        return next(new BadRequestError("Provide all of the required fields!"));
    }

    try {
        const user = await authService.createLocalUser({
            displayName,
            dob,
            username,
            email,
            password,
            profileImageURL: `${process.env.SERVER_ORIGIN}/uploads/default_pfp.png`,
        });

        req.login(user, (err) => {
            if (err) return next(new InternalServerError());

            return res.json({
                isAuthenticated: true,
                data: user,
            });
        });
    } catch (err) {
        if (err.code === 11000)
            return next(
                new ConflictError(
                    "User with the provided username/email already exists!"
                )
            );
    }
});

const signIn = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(new InternalServerError()); // local strategy error
        if (!user) return next(new BadRequestError(info.message)); // no user error

        req.logIn(user, (err) => {
            if (err) return next(new InternalServerError()); // error while establishing session

            return res.status(200).json({
                isAuthenticated: true,
                data: user,
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
    if (req.user)
        return res.status(200).json({
            isAuthenticated: true,
            data: req.user,
        });

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
