const winston = require('winston');
const { combine, timestamp, json, colorize, printf } = winston.format;


const timestampFormat = { format: 'YYYY-MM-DD hh:mm:ss.SSS A' };
const errorFilter = winston.format((info, opts) => info.level === 'error' ? info : false);
const infoFilter = winston.format((info, opts) => info.level === 'info' ? info : false);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: './logs/combined.log',
            format: combine(infoFilter(), timestamp(timestampFormat), json()),

        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/app-error.log',
            format: combine(errorFilter(), timestamp(timestampFormat), json()),
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: './logs/exceptions.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: './logs/rejections.log' })
    ],
    exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: combine(
                timestamp(timestampFormat),
                colorize(),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
            ),
        })
    );
}

module.exports = logger;

