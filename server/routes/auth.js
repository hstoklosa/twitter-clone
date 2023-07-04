const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Local provider

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.get("/confirm-email/:email", authController.confirmEmail);

// Google provider

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/google/fail" }), authController.googleCallback);

router.get("/google/fail", (req, res) => res.send({ error: true, message: "Google authentication failed!" }));

// General

router.get("/logout", authController.logout);

router.get("/check-auth", authController.isAuth);

router.get("/check-identifier/:identifier", authController.checkIdentifier);

module.exports = router;
