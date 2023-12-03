const { UnauthenticatedError } = require("../utils/errors");

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    next(new UnauthenticatedError("You are not authenticated!"));
};

module.exports = authenticate;
