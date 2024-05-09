const { BadRequestError } = require("../utils/errors");

const rateLimitHandler = (req, res, next, options) => {
    return next(new BadRequestError("Too many requests, please try again in an hour!"))
}

module.export = rateLimitHandler;