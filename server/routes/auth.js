const express = require("express");
const passport = require("../config/passport");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Google provider
router.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_ORIGIN}/home`,
        failureRedirect: `${process.env.CLIENT_ORIGIN}`,
    })
);

// Local provider
router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.get("/verify/:id/:code", authController.verifyToken);

// General routes
router.get("/check-identifier/:identifier", authController.checkIdentifier);

router.get("/me", authController.isAuth);

router.get("/logout", authController.logout);


module.exports = router;
