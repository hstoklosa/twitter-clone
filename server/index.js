require("dotenv").config();

const app = require("./app");
const cors = require("cors");

const passport = require("./config/passport");
const connectDB = require("./config/database");
const sessionMiddleware = require("./config/session");

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
        credentials: true,
    })
);

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());


connectDB(() => {
    const PORT = process.env.API_PORT || 8080;

    app.listen(PORT, () => {
        console.log(`[SERVER]: Server is running at port ${PORT}`);
    });
});
