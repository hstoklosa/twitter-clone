require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passportConfig");
const CustomError = require("./config/CustomError");

const app = express();

// Create MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    .catch((err) => console.error(err))
    .then(() => console.log("MongoDB connection established!"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cors({
        // put = replace resource entirely, patch = replace part of a resource????
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT"],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        revsave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);

app.use(passport.initialize());
app.use(passport.session()); // express-session piggyback

app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => res.send("Hello World!"));

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
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
