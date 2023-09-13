const express = require("express");

const tweetController = require("../controllers/tweet.controller");
const upload = require("../config/multerConfig");

const router = express.Router();

router.get("/:tweetId", tweetController.getTweet);

router.get("/:tweetId/liking_users", tweetController.getLikingUsers);

router.post("/", upload.single("media"), tweetController.createTweet);

router.post("/reply", tweetController.createReply);

router.post("/retweet", tweetController.createRetweet);

router.post("/:tweetId/like", tweetController.likeTweet);

router.delete("/:tweetId/like", tweetController.unlikeTweet);

router.delete("/:id", tweetController.deleteTweet);
// ("/:id", tweetController.getTweet, tweetController.deleteTweet);

module.exports = router;
