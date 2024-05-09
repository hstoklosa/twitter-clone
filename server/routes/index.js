const path = require("path");
const express = require("express");

const router = express.Router();

const authRoute = require("./auth");
const userRoute = require("./user");
const tweetRoute = require("./tweet");
const chatRoute = require("./tweet");

router.use("/api/uploads", express.static(path.join(__dirname, '../uploads')));
router.use("/api/auth", authRoute);
router.use("/api/users", userRoute);
router.use("/api/tweets", tweetRoute);

module.exports = router;