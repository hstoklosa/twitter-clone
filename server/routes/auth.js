const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Local provider
router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.get("/confirm-email/:email", authController.confirmEmail);

// Google provider
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}/home`,
        failureRedirect: `${process.env.CLIENT_URL}`,
    })
);

// General
router.get("/check-identifier/:identifier", authController.checkIdentifier);

router.get("/check", authController.isAuth);

router.get("/logout", authController.logout);

module.exports = router;
