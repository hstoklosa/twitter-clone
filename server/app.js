const express = require("express");
const passport = require("./config/passport");
const sessionMiddleware = require("./config/session");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes/index");

const rateLimit = require("express-rate-limit"); // Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.

const helmet = require("helmet"); // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!

const mongoSanitize = require('express-mongo-sanitize'); // This module searches for any keys in objects that begin with a $ sign or contain a ., from req.body, req.query or req.params.

const cors = require("cors"); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cookieParser = require("cookie-parser"); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.


const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
})); // Returns middleware that only parses urlencoded bodies

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// app.use(helmet());

const limiter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000, // In one hour
    message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/tawk", limiter);

app.use(mongoSanitize());

app.use(errorHandler); // Error-handling middleware

app.use(routes);

module.exports = app;