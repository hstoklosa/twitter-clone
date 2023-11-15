const User = require("../models/User.model");
const Tweet = require("../models/Tweet.model");

const { ObjectId } = require("mongoose").Types;
const asyncHandler = require("../middlewares/asyncHandler");
const paginate = require("../helpers/paginatePlugin");
const { userTweetSelector } = require("../helpers/selectors");
const { userLookup, quoteLookup, replyLookup } = require("../helpers/aggregation");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");

const getBookmarks = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (!(await User.exists({ _id: userId })))
        return next(new NotFoundError("The user in the request could not be found!"));

    if (userId !== authUserId.toString())
        return next(new UnauthorizedError("You are not authorized to bookmark this tweet!"));

    const response = await paginate(
        "User",
        [
            { $match: { _id: new ObjectId(userId) } },

            {
                $lookup: {
                    from: "tweets",
                    localField: "bookmarks",
                    foreignField: "_id",
                    as: "bookmark",
                },
            },

            {
                $unwind: {
                    path: "$bookmark",
                    preserveNullAndEmptyArrays: true,
                },
            },

            { $project: { document: "$bookmark" } },
            { $replaceRoot: { newRoot: "$document" } },

            ...userLookup,
            ...quoteLookup,
            ...replyLookup,

            // { $project: { document: "$$ROOT", ...userTweetSelector } },
            // { $replaceRoot: { newRoot: "$document" } },
        ],
        req.pagination
    );
    console.log(response);

    return res.status(200).json(response);
});

const createBookmark = asyncHandler(async (req, res, next) => {
    const { _id: authUserId } = req.user;
    const { userId } = req.params;
    const { tweetId } = req.body;

    if (!(await Tweet.exists({ _id: tweetId })))
        next(new NotFoundError("The request tweet could not be found!"));

    if (!(await User.exists({ _id: userId })))
        next(new NotFoundError("The user in the request could not be found!"));

    if (userId !== authUserId.toString())
        next(new UnauthorizedError("You are not authorized to bookmark this tweet!"));

    await User.findByIdAndUpdate(userId, {
        $addToSet: { bookmarks: tweetId },
    });

    return res.status(200).json({
        isBookmarked: true,
    });
});

const deleteBookmark = asyncHandler(async (req, res, next) => {
    const { userId, tweetId } = req.params;

    const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { bookmarks: tweetId } },
        { new: true }
    );

    if (!user) {
        return next(new NotFoundError("The user in the request could not be found!"));
    }

    return res.status(200).json({
        isBookmarked: false,
    });
});

const deleteAllBookmarks = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const currentUser = req.user;
    const currentUserId = currentUser._id.toString();

    if (!(await User.exists({ _id: userId })))
        return next(new NotFoundError("The user in the request could not be found!"));

    if (currentUserId !== userId)
        return next(
            new UnauthorizedError("You are not authorized to clear the bookmarks of this user!")
        );

    await User.findByIdAndUpdate(userId, {
        $set: { bookmarks: [] },
    });

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
