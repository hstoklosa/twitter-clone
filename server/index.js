require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passportConfig");

const errorHandler = require("./middlewares/errorHandler");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const tweetRoute = require("./routes/tweet");

// Test MongoDB connection
(async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
        });

        if (connection) {
            console.log("MongoDB connection established!");
        }
    } catch (err) {
        console.error("Couldn't establish a MongoDB connection!");
        console.error(err);
    }
})();

// Configurations
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
};

const sessionStore = new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: "native",
});

const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1d
    },
};

const app = express();

// Middleware
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session()); // express-session piggyback

// API routes
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tweets", tweetRoute);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.SERVER_DOCKER_PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
