const { InternalServerError } = require("../config/ApplicationError");

const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(new InternalServerError());
};

module.exports = asyncHandler;
