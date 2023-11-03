const ErrorStatus = {
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHENTICATED: 401,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

class ApplicationError extends Error {
    constructor(status, message, isOperational = true) {
        super(message);

        if (!status) {
            throw new Error("ApplicationError: Status code is required!");
        }

        if (!message) {
            throw new Error("ApplicationError: Error message is required!");
        }

        this.name = this.constructor.name;
        this.status = status;
        this.isOperational = isOperational; // default: notify user about the error

        Error.captureStackTrace(this, this.constructor);
    }

    static isTrusted = (error) => {
        if (error instanceof ApplicationError) {
            return error.isOperational;
        }

        return false;
    };
}

class BadRequestError extends ApplicationError {
    constructor(message = "The request is invalid!") {
        super(ErrorStatus.BAD_REQUEST, message);
    }
}

class UnauthenticatedError extends ApplicationError {
    constructor(message = "You are not authenticated to access this resource!") {
        super(ErrorStatus.UNAUTHENTICATED, message);
    }
}

class UnauthorizedError extends ApplicationError {
    constructor(message = "You are not authorized to access this resource!") {
        super(ErrorStatus.UNAUTHORIZED, message);
    }
}

class NotFoundError extends ApplicationError {
    constructor(message = "The requested resource could not be found") {
        super(ErrorStatus.NOT_FOUND, message);
    }
}

class ConflictError extends ApplicationError {
    constructor(
        message = "The request could not be completed due to a conflict with the current state of the server!"
    ) {
        super(ErrorStatus.CONFLICT, message);
    }
}

class InternalServerError extends ApplicationError {
    constructor(message = "Internal server error, please try again later!") {
        super(ErrorStatus.INTERNAL_SERVER_ERROR, message, false);
    }
}

module.exports = {
    ApplicationError,
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
    NotFoundError,
    ConflictError,
    InternalServerError,
};
