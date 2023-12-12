const { ObjectId } = require("mongoose").Types;
const User = require("../models/User.model");
const Tweet = require("../models/Tweet.model");
const asyncHandler = require("../middlewares/asyncHandler");

const paginate = require("../helpers/paginatePlugin");

const tweetService = require("../services/tweet.service");

const { NotFoundError, ForbiddenError } = require("../utils/errors");
const { isObjEmpty } = require("../utils/object");
const pick = require("../utils/pick");

const getTweet = asyncHandler(async (req, res, next) => {
    const { tweetId } = req.params;

    if (!(await Tweet.exists({ _id: tweetId })))
        return next(new NotFoundError("The requested tweet couldn't be found!"));

    const tweet = await tweetService.fetchById(tweetId);

    return res.status(200).json({
        tweet,
    });
});

const deleteTweet = asyncHandler(async (req, res, next) => {
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId);
    const tweetAuthorId = tweet.author._id.toString();
    const authUserId = req.user._id.toString();

    if (!tweet)
        return next(
            new NotFoundError("The tweet couldn't be found in the database!")
        );

    if (tweetAuthorId !== authUserId)
        return next(
            new ForbiddenError("You are not authorized to delete this tweet!")
        );

    await tweet.deleteOne();

    return res.status(200).json({
        isTweetDeleted: true,
    });
});

const createTweet = asyncHandler(async (req, res, next) => {
    const { content, author, replyTo = null, quoteTo = null } = req.body;

    const mentions = content.match(/(@[a-zA-Z0-9_]+)/g) || [];
    const hashtags = content.match(/#\w+/g) || [];

    const tweet = new Tweet({
        content,
        author,
        mentions,
        hashtags,
        replyTo,
        quoteTo,
    });

    // Check for the tweet type
    if (quoteTo && !(await Tweet.exists({ _id: quoteTo })))
        return next(new NotFoundError("Tweet being quoted is not found!"));

    if (replyTo) {
        const originalTweet = await Tweet.findById(replyTo);

        if (!originalTweet)
            return next(new NotFoundError("Tweet being replied to is not found!"));

        await originalTweet.updateRepliesCount();
    }

    // Attach incoming files
    if (req.file) {
        tweet.media = {
            url: `http://localhost:8080/${req.file.path}`,
            mediaType: req.file.mimetype.split("/")[0],
        };
    }

    await tweet.save();

    return res.status(200).json({
        isTweetAdded: true,
    });
});

const createRepost = asyncHandler(async (req, res, next) => {
    const { _id: userId } = req.user;
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) next(new NotFoundError("Tweet not found!"));

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

    if (!tweet) next(new NotFoundError("Tweet not found!"));

    const user = await User.findById(userId);

    await Promise.all([tweet.deleteRetweet(userId), user.deleteRetweet(tweetId)]);

    return res.status(200).json({
        isReposted: false,
    });
});

const likeTweet = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const tweetId = req.params.tweetId;

    const tweet = await tweetService.createLike(tweetId, userId);

    if (!tweet)
        return next(new NotFoundError("The tweet to be liked was not found!"));

    return res.status(200).json({
        isLiked: true,
    });
});

const unlikeTweet = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const tweetId = req.params.tweetId;

    const tweet = await tweetService.removeLike(tweetId, userId);

    if (!tweet)
        return next(new NotFoundError("The tweet to be unliked was not found!"));

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
