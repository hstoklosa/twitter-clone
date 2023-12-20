const express = require("express");

const userController = require("../controllers/user.controller");
const authenticate = require("../middlewares/authenticate");
const bookmarkController = require("../controllers/bookmark.controller");

const paginate = require("../middlewares/paginate");
const upload = require("../config/multer");

// File upload fields
const updateUserFields = [
    { name: "profileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
];

// Routes
const router = express.Router();

router.use(authenticate);


router.get("/:username", userController.getUser);

router.get("/:userId/home_timeline", paginate, userController.getHomeFeed);

router.get("/:userId/timeline", paginate, userController.getProfileTimeline);

router.get("/:userId/replies", paginate, userController.getRepliesTimeline);

router.get("/:userId/media", paginate, userController.getMediaTimeline);

router.get("/:userId/likes", paginate, userController.getLikesTimeline);

router.get("/:username/followers", paginate, userController.getFollowers);

router.get("/:username/following", paginate, userController.getFollowing);

router.get("/:userId/bookmarks", paginate, bookmarkController.getBookmarks);

router.post("/:userId/bookmarks", bookmarkController.createBookmark);

router.put("/:userId", upload.fields(updateUserFields), userController.updateUser);

router.put("/:userId/following", userController.followUser);

router.delete("/:userId/following", userController.unfollowUser);

router.delete("/:userId/bookmarks/:tweetId", bookmarkController.deleteBookmark);

router.delete("/:userId/bookmarks", bookmarkController.deleteAllBookmarks);

module.exports = router;
