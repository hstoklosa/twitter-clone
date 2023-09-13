const Tweet = require("../models/Tweet.model");

const asyncHandler = require("../middlewares/asyncHandler");
const { NotFoundError } = require("../config/ApplicationError");

const getTweet = asyncHandler(async (req, res, next) => {
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId).populate("author");

    if (!tweet) {
        return next(new NotFoundError("Tweet not found!"));
    }

    return res.status(200).json({
        data: {
            tweet: tweet || [],
        },
    });
});

const getLikingUsers = asyncHandler(async (req, res, next) => {
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId).select("likes -_id").populate("likes");

    console.log(tweet);

    // TODO: Get specific data to display on liking users page
});

const createTweet = asyncHandler(async (req, res, next) => {
    const { content, author } = req.body;

    const mentions = content.match(/(@[a-zA-Z0-9_]+)/g);
    const hashtags = content.match(/#\w+/g);

    const tweet = new Tweet({
        content,
        author,
        mentions,
        hashtags,
    });

    req.file &&
        (tweet.media = {
            url: `http://localhost:8080/${req.file.path}`,
            mediaType: req.file.mimetype.split("/")[0],
        });

    const newTweet = await tweet.save();

    return res.status(200).json({
        tweet: newTweet,
    });
});

const createReply = asyncHandler(async (req, res, next) => {
    const { content, author, media, hashtags, inReplyTo } = req.body;

    const tweet = new Tweet({
        content,
        author,
        media,
        hashtags,
        inReplyTo,
    });

    const newTweet = await tweet.save();

    return res.status(200).json({
        tweet: newTweet,
    });
});

const createRetweet = asyncHandler(async () => {
    const { content, author, media, hashtags, retweetId } = req.body;

    const tweet = new Tweet({
        content,
        author,
        media,
        hashtags,
        retweetId,
    });

    const newTweet = await tweet.save();

    return res.status(200).json({
        tweet: newTweet,
    });
});

const likeTweet = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const tweetId = req.params.tweetId;

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            // addToSet will only add if it doesn't exist yet
            $addToSet: { likes: userId },
        },
        { new: true }
    );

    if (!tweet) {
        return next(new NotFoundError("Tweet not found!"));
    }

    console.log("got here");
    return res.status(200).json({
        data: {
            isLiked: true,
        },
    });
});

const unlikeTweet = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const tweetId = req.params.tweetId;

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $pull: { likes: userId },
        },
        { new: true }
    );

    if (!tweet) {
        return next(new NotFoundError("Tweet not found!"));
    }

    return {
        data: {
            isLiked: false,
            likes: tweet.likes,
        },
    };
});

const deleteTweet = asyncHandler(async (req, res, next) => {
    const tweet = res.tweet;
    // todo: delete this tweet using await res.tweet.remove();?
});

module.exports = {
    getTweet,
    getLikingUsers,
    createTweet,
    createReply,
    createRetweet,
    likeTweet,
    unlikeTweet,
    deleteTweet,
};
