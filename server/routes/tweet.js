const express = require("express");

const tweetController = require("../controllers/tweet.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const paginate = require("../middlewares/paginateMiddleware");

const upload = require("../config/multer");

const router = express.Router();

router.use(isAuthenticated);

router.get("/:tweetId", tweetController.getTweet);

router.post("/", upload.single("media"), tweetController.createTweet);

router.post("/:tweetId/repost", tweetController.createRepost);

router.post("/:tweetId/like", tweetController.likeTweet);

router.delete("/:tweetId", tweetController.deleteTweet);

router.delete("/:tweetId/repost", tweetController.deleteRepost);

router.delete("/:tweetId/like", tweetController.unlikeTweet);

module.exports = router;
