require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const passport = require("./config/passport");
const corsOptions = require("./config/cors");
const sessionMiddleware = require("./config/session");
const connectDB = require("./config/database");

const errorHandler = require("./middlewares/errorHandler");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const tweetRoute = require("./routes/tweet");

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(sessionMiddleware);

// express-session piggyback middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/uploads", express.static("./uploads"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tweets", tweetRoute);

// Error-handling middleware
app.use(errorHandler);

connectDB(() => {
    const PORT = process.env.SERVER_PORT || 3001;

    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
});
