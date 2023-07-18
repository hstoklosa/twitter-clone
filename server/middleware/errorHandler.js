const CustomHttpError = require("../config/CustomHttpError");

const errorHandler = (err, req, res, next) => {
    const errorResponse = {
        status: 500,
        message: "Internal server error!",
    };

    // production & development
    if (err instanceof CustomHttpError) {
        err.status && (errorResponse.status = err.status);
    }

    // development
    if (process.env.NODE_ENV !== "production") {
        errorResponse.stack = err.stack;
        errorResponse.message = err.message;
    }

    return res.status(errorResponse.status).json({
        error: errorResponse,
    });
};

module.exports = errorHandler;
