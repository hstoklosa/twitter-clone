const morgan = require("morgan");
const logger = require('../utils/logger');

const loggerMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    }
);

module.exports = loggerMiddleware;