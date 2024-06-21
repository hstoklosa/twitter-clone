const express = require("express");

const tweetController = require("../controllers/tweet.controller");
const authenticate = require("../middlewares/authenticate");
const paginate = require("../middlewares/paginate");
const upload = require("../config/multer");


const router = express.Router();

router.use(authenticate);

router.get("/:tweetId", tweetController.getTweet);

router.get("/:tweetId/replies", paginate, tweetController.getTweetReplies);

router.get("/:tweetId/engagement", paginate, tweetController.getTweetEngagement);

router.get("/search/recent", paginate, tweetController.getSearchTweets);

router.get("/trending/keywords", paginate, tweetController.getTrendingKeywords);

router.get("/trending/content", paginate, tweetController.getTrendingTweets);

router.post("/", upload.single("media"), tweetController.createTweet);

router.post("/:tweetId/repost", tweetController.createRepost);

router.post("/:tweetId/like", tweetController.likeTweet);

router.delete("/:tweetId", tweetController.deleteTweet);

router.delete("/:tweetId/repost", tweetController.deleteRepost);

router.delete("/:tweetId/like", tweetController.unlikeTweet);

module.exports = router;