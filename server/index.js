require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passportConfig");

const errorHandler = require("./middleware/errorHandler");
const authRoute = require("./routes/auth");

const app = express();

// Test MongoDB connection
(async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
        });

        if (connection) {
            console.log("MongoDB connection established!");
            return;
        }
    } catch (err) {
        console.error(err);
    }

    console.error("Couldn't establish a MongoDB connection!");
})();

// Configurations
const sessionStore = new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: "native",
});

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
};

const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
};

// Middleware
app.use(morgan("dev"));

app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session()); // express-session piggyback

app.use((req, res, next) => {
    console.log("Session: ", req.session);
    console.log("Cookies: ", req.cookies);
    next();
});

// Routes
app.use("/api/auth", authRoute);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
