const User = require("../models/User.model");
const Tweet = require("../models/Tweet.model");
const asyncHandler = require("../middlewares/asyncHandler");

const { NotFoundError, ForbiddenError } = require("../utils/errors");

const getTweet = asyncHandler(async (req, res, next) => {
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId).populate("author");

    if (!tweet) {
        return next(new NotFoundError("The requested tweet couldn't be found!"));
    }

    return res.status(200).json({
        tweet: tweet || [],
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

    // check for a particular type of tweet
    if (quoteTo && !(await Tweet.exists({ _id: quoteTo })))
        return next(new NotFoundError("Tweet being quoted is not found!"));

    if (replyTo) {
        const originalTweet = await Tweet.findById(replyTo);

        if (!originalTweet) {
            return next(new NotFoundError("Tweet being replied to is not found!"));
        }

        await originalTweet.updateRepliesCount();
    }

    // attach any incoming files
    if (req.file) {
        tweet.media = {
            url: `http://localhost:8080/${req.file.path}`,
            mediaType: req.file.mimetype.split("/")[0],
        };
    }

    const newTweet = await tweet.save();

    return res.status(200).json({
        tweet: newTweet,
    });
});

const deleteTweet = asyncHandler(async (req, res, next) => {
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        return next(new NotFoundError("Tweet not found!"));
    }

    if (tweet.author._id.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError("You are not authorized to delete this tweet!"));
    }

    await tweet.deleteOne();

    return res.status(200).json({
        message: "Tweet deleted successfully!",
    });
});

const createRepost = asyncHandler(async (req, res, next) => {
    const { _id: userId } = req.user;
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        return next(new NotFoundError("Tweet not found!"));
    }

    const user = await User.findById(userId);

    await Promise.all([tweet.addRetweet(userId), user.addRetweet(tweetId)]);

    return res.status(200).json({
        isReposted: true,
    });
});

const deleteRepost = asyncHandler(async (req, res, next) => {
    const { _id: userId } = req.user;
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        return next(new NotFoundError("Tweet not found!"));
    }

    const user = await User.findById(userId);

    await Promise.all([tweet.deleteRetweet(userId), user.deleteRetweet(tweetId)]);

    return res.status(200).json({
        isReposted: false,
    });
});

const likeTweet = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const tweetId = req.params.tweetId;

    // addToSet: update the array only if the value doesn't exist yet
    const tweet = await Tweet.findByIdAndUpdate(tweetId, { $addToSet: { likes: userId } });

    if (!tweet) {
        return next(new NotFoundError("The tweet to be liked was not found!"));
    }

    return res.status(200).json({
        isLiked: true,
    });
});

const unlikeTweet = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const tweetId = req.params.tweetId;

    const tweet = await Tweet.findByIdAndUpdate(tweetId, { $pull: { likes: userId } });

    if (!tweet) {
        return next(new NotFoundError("The tweet to be unliked was not found!"));
    }

    return res.status(200).json({
        isLiked: false,
    });
});

module.exports = {
    getTweet,
    createTweet,
    createRepost,
    likeTweet,
    deleteTweet,
    deleteRepost,
    unlikeTweet,
};
