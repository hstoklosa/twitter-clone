const express = require("express");

const userController = require("../controllers/user.controller");
const bookmarkController = require("../controllers/bookmark.controller");

const paginate = require("../middlewares/paginateMiddleware");
const upload = require("../config/multer");

// Multer fields
const updateUserFields = [
    { name: "profileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
];

// Routes
const router = express.Router();

router.use(isAuthenticated);

router.get("/:username", userController.getUser);

router.get("/:userId/timeline", paginate, userController.getProfileTimeline);

router.get("/:userId/replies", paginate, userController.getRepliesTimeline);

router.get("/:userId/media", paginate, userController.getMediaTimeline);

router.get("/:userId/likes", paginate, userController.getLikesTimeline);

router.get("/:username/followers", paginate, userController.getFollowers);

router.get("/:username/following", paginate, userController.getFollowing);

router.put("/:userId", upload.fields(updateUserFields), userController.updateUser);

router.put("/:userId/following", userController.followUser);

router.delete("/:userId/following", userController.unfollowUser);

module.exports = router;
