const { ApplicationError } = require("../utils/errors");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    const errorResponse = {
        status: 500,
        message: "Internal server error. Try again later!",
    };

    if (ApplicationError.isTrusted(err)) {
        errorResponse.status = err.status;
        errorResponse.message = err.message;
    }

    if (process.env.NODE_ENV !== "production") {
        errorResponse.stack = err.stack;
    }

    logger.error(err, err.message);

    return res.status(errorResponse.status).json({
        error: errorResponse,
    });
};

module.exports = errorHandler;
