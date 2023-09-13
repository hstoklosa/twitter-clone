const { ApplicationError } = require("../config/ApplicationError");

const errorHandler = (err, req, res, next) => {
    const errorResponse = {
        status: 500,
        message: "Internal server error. Try again later!",
    };

    if (ApplicationError.isTrustedError(err)) {
        errorResponse.status = err.status;
        errorResponse.message = err.message;
    }

    if (process.env.NODE_ENV !== "production") {
        errorResponse.stack = err.stack;
    }

    return res.status(errorResponse.status).json({
        error: errorResponse,
    });
};

module.exports = errorHandler;
