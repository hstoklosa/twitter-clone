const User = require("../models/User.model");
const Tweet = require("../models/Tweet.model");
const asyncHandler = require("../middlewares/asyncHandler");

const { NotFoundError, ForbiddenError } = require("../utils/errors");

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

const createTweet = asyncHandler(async (req, res, next) => {
    const { content, author, replyTo = null, quoteTo = null } = req.body;

    const mentions = content.match(/(@[a-zA-Z0-9_]+)/g);
    const hashtags = content.match(/#\w+/g);

    const tweet = new Tweet({
        content,
        author,
        mentions,
        hashtags,
        replyTo,
        quoteTo,
    });

    if (replyTo) {
        const originalTweet = await Tweet.findById(replyTo);

        if (!originalTweet) {
            return next(new NotFoundError("Tweet being replied to is not found!"));
        }

        await originalTweet.updateRepliesCount();
    }

    if (quoteTo) {
        const originalTweet = await Tweet.findById(quoteTo);

        if (!originalTweet) {
            return next(new NotFoundError("Tweet being retweeted is not found!"));
        }
    }

    // attach media if available
    if (req.file)
        tweet.media = {
            url: `http://localhost:8080/${req.file.path}`,
            mediaType: req.file.mimetype.split("/")[0],
        };

    const newTweet = await tweet.save();

    return res.status(200).json({
        tweet: newTweet,
    });
});

const likeTweet = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const tweetId = req.params.tweetId;

    // addToSet will only add if it doesn't exist yet
    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $addToSet: { likes: userId } },
        { new: true }
    );

    if (!tweet) {
        return next(new NotFoundError("Tweet not found!"));
    }

    return res.status(200).json({
        isLiked: true,
    });
});

const unlikeTweet = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const tweetId = req.params.tweetId;

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $pull: { likes: userId } },
        { new: true }
    );

    if (!tweet) {
        return next(new NotFoundError("Tweet not found!"));
    }

    return res.status(200).json({
        isLiked: false,
    });
});

module.exports = {
    getTweet,
    createTweet,
    likeTweet,
    unlikeTweet,
};
