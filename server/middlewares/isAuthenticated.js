const { UnauthenticatedError } = require("../utils/errors");

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    next(new UnauthenticatedError("You are not authenticated!"));
};

module.exports = isAuthenticated;
