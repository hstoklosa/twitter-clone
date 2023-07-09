require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passportConfig");
const CustomError = require("./config/CustomError");

const app = express();

// Test and prepare MongoDB connection

(async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
        });

        if (connection) {
            console.log("MongoDB connection established!");
        }
    } catch (err) {
        console.error(err);
    }

    console.log("Couldn't establish a MongoDB connection!");
})();

const sessionStore = new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: "native",
});

// Middleware

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
    // put = replace entirely, patch = replace part
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
        credentials: true,
    })
);

app.use(
    session({
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

app.use(passport.initialize());
app.use(passport.session()); // express-session piggyback

app.use((req, res, next) => {
    console.log("Session: ", req.session);
    console.log("Cookies: ", req.cookies);
    next();
});

// Routes

app.use("/auth", require("./routes/auth"));

// Generic and detailed error handling middleware

app.use((err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            error: err.message,
        });
    }

    console.error(err);
    return res.status(500).json({
        error: "An error occurred on the server.",
    });
});

// Starting the server

const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
