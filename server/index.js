require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const passport = require("./config/passportConfig");
const CustomError = require("./config/CustomError");

const sessionStore = new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: "native",
});

const app = express();

// Create MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    .catch((err) => console.error(err))
    .then(() => console.log("MongoDB connection established!"));

// Middleware

app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        // put = replace resource entirely, patch = replace part of a resource????
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use(
    session({
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

app.use(passport.initialize());
app.use(passport.session()); // express-session piggyback

// Verify cookies and session
app.use((req, res, next) => {
    console.log("Cookies: ", req.cookies);
    console.log("Session: ", req.session);

    next();
});

// Routes
app.use("/auth", require("./routes/auth"));

// Error handling (detailed logging on the server, genereic logs on the client)
app.use((err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ error: true, message: err.message });
    }

    console.error(err);
    res.status(500).json({ error: true, message: "An error occurred on the server." });
});

// Starting point
const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
