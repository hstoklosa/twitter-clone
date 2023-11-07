const express = require("express");

const tweetController = require("../controllers/tweet.controller");

const upload = require("../config/multer");

const router = express.Router();

router.get("/:tweetId", tweetController.getTweet);

router.post("/", upload.single("media"), tweetController.createTweet);

router.post("/:tweetId/like", tweetController.likeTweet);

router.delete("/:tweetId/like", tweetController.unlikeTweet);

module.exports = router;
