const { ObjectId } = require("mongoose").Types;
const User = require("../models/User.model");
const Bookmark = require("../models/Bookmark.model");
const Tweet = require("../models/Tweet.model");

const asyncHandler = require("../middlewares/asyncHandler");
const bookmarkService = require("../services/bookmark.service");

const {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
} = require("../utils/errors");

const getBookmarks = asyncHandler(async (req, res, next) => {
    const authUserId = new ObjectId("64b2c9b8acd7c63679fe9c76");

    // const { _id: authUserId } = req.user;
    const { userId } = req.params;

    if (!(await User.exists({ _id: userId })))
        return next(
            new NotFoundError("The user in the request could not be found!")
        );

    if (userId !== authUserId.toString())
        return next(
            new UnauthorizedError("You are not authorized to bookmark this tweet!")
        );

    const response = await bookmarkService.fetchUserBookmarks(
        new ObjectId(userId),
        req.pagination
    );

    return res.status(200).json(response);
});

const createBookmark = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const { tweetId } = req.body;
    const authUserId = req.user._id.toString();

    if (!(await User.exists({ _id: userId })))
        return next(new NotFoundError("The user could not be found!"));

    if (!(await Tweet.exists({ _id: tweetId })))
        return next(new NotFoundError("The tweet could not be found!"));

    console.log(userId, tweetId);

    const data = {
        user: new ObjectId(userId),
        tweet: new ObjectId(tweetId),
    };

    const b = await Bookmark.find({});
    console.log(b);

    if (
        await Bookmark.exists({
            user: userId,
            tweet: tweetId,
        })
    )
        return next(new BadRequestError("You already bookmarked this tweet!"));

    await bookmarkService.createBookmark(userId, tweetId);

    return res.status(200).json({
        isBookmarked: true,
    });
});

const deleteBookmark = asyncHandler(async (req, res, next) => {
    const { userId, tweetId } = req.params;
    const authUserId = req.user._id.toString();

    if (!(await User.exists({ _id: userId })))
        return next(new NotFoundError("The user could not be found!"));

    if (!(await Tweet.exists({ _id: tweetId })))
        return next(new NotFoundError("The tweet could not be found!"));

    if (userId !== authUserId)
        return next(new UnauthorizedError("You are not authorized to do this!"));

    await bookmarkService.deleteBookmark(authUserId, tweetId);

    return res.status(200).json({
        isBookmarked: false,
    });
});

const deleteAllBookmarks = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const authUserId = req.user._id.toString();

    if (!(await User.exists({ _id: userId })))
        return next(new NotFoundError("The user could not be found!"));

    if (authUserId !== userId)
        return next(new UnauthorizedError("You are not authorized to do this!"));

    await bookmarkService.deleteAllBookmarks(new ObjectId(userId));

    return res.status(200).json({
        bookmarksCleared: true,
    });
});

module.exports = {
    getBookmarks,
    createBookmark,
    deleteBookmark,
    deleteAllBookmarks,
};
