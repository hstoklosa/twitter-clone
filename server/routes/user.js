const express = require("express");

const userController = require("../controllers/user.controller");
const bookmarkController = require("../controllers/bookmark.controller");
const authenticate = require("../middlewares/authenticate");
const paginate = require("../middlewares/paginate");
const upload = require("../config/multer");


const router = express.Router();

router.use(authenticate);

router.get("/:username", userController.getUser);

router.get("/:userId/recommended", paginate, userController.getRecommendedUsers);

router.get("/:userId/home_timeline", paginate, userController.getHomeFeed);

router.get("/:userId/timeline", paginate, userController.getProfileTimeline);

router.get("/:userId/replies", paginate, userController.getRepliesTimeline);

router.get("/:userId/media", paginate, userController.getMediaTimeline);

router.get("/:userId/likes", paginate, userController.getLikesTimeline);

router.get("/:username/followers", paginate, userController.getFollowers);

router.get("/:username/following", paginate, userController.getFollowing);

router.get("/:userId/bookmarks", paginate, bookmarkController.getBookmarks);

router.get("/search/recent", paginate, userController.getQueryUsers);

router.post("/:userId/bookmarks", bookmarkController.createBookmark);

router.post("/:userId/pin/:tweetId", userController.pinTweet);

router.put("/:userId", upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
]), userController.updateUser);

router.put("/:userId/following", userController.followUser);

router.delete("/:userId/following", userController.unfollowUser);

router.delete("/:userId/bookmarks/:tweetId", bookmarkController.deleteBookmark);

router.delete("/:userId/bookmarks", bookmarkController.deleteAllBookmarks);

router.delete("/:userId/pin/:tweetId", userController.unpinTweet);


module.exports = router;