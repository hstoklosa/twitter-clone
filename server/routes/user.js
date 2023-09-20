const express = require("express");
const userController = require("../controllers/user.controller");
const paginate = require("../middlewares/paginate");
const upload = require("../config/multerConfig");

const router = express.Router();

// User information
router.get("/:username", userController.getUser);

router.get("/:username/tweets", paginate, userController.getTweets);

router.get("/:userId/liked_tweets", userController.getLikedTweets);

router.put(
    "/:userId",
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "bannerImage", maxCount: 1 },
    ]),
    userController.updateUser
);

router.put("/:userId/following", userController.followUser);

router.delete("/:userId/following", userController.unfollowUser);

module.exports = router;
