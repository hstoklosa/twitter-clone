const User = require("../models/User.model");
const Bookmark = require("../models/Bookmark.model");
const paginate = require("../helpers/paginatePlugin");
const { userTweetSelector } = require("../helpers/selectors");


const fetchUserBookmarks = async (userId, options) => {
    return await paginate(
        "Bookmark",
        [
            { $match: { user: userId } },


            {
                $lookup: {
                    from: "tweets",
                    localField: "tweet",
                    foreignField: "_id",
                    as: "tweetDetails",
                },
            },
            {
                $unwind: "$tweetDetails",
            },
            {
                $addFields: {
                    bookmarkCreatedAt: "$createdAt"
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$tweetDetails", { bookmarkCreatedAt: "$bookmarkCreatedAt" }]
                    }
                }
            },

            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $unwind: {
                    path: "$author",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $lookup: {
                    from: "tweets",
                    localField: "quoteTo",
                    foreignField: "_id",
                    as: "quoteTo",
                },
            },
            {
                $unwind: {
                    path: "$quoteTo",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $lookup: {
                    from: "users",
                    localField: "quoteTo.author",
                    foreignField: "_id",
                    as: "quoteTo.author",
                },
            },
            {
                $unwind: {
                    path: "$quoteTo.author",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $lookup: {
                    from: "tweets",
                    localField: "replyTo",
                    foreignField: "_id",
                    as: "replyTo",
                },
            },
            {
                $unwind: {
                    path: "$replyTo",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $lookup: {
                    from: "users",
                    localField: "replyTo.author",
                    foreignField: "_id",
                    as: "replyTo.author",
                },
            },
            {
                $unwind: {
                    path: "$replyTo.author",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $project: {
                    bookmarkCreatedAt: 1,
                    ...userTweetSelector
                },
            },
        ],
        {
            ...options,
            sortBy: { bookmarkCreatedAt: -1 },
        }

    );
};

const createBookmark = async (userId, tweetId) => {
    await Bookmark.create({
        user: userId,
        tweet: tweetId
    });
};

const deleteBookmark = async (userId, tweetId) => {
    await Bookmark.deleteOne({
        user: userId,
        tweet: tweetId
    });
};

const deleteAllBookmarks = async (userId) => {
    await Bookmark.deleteMany({ user: userId });
};

module.exports = {
    fetchUserBookmarks,
    createBookmark,
    deleteBookmark,
    deleteAllBookmarks,
};
