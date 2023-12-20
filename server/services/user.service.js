const User = require("../models/User.model");
const Tweet = require("../models/Tweet.model");
const paginate = require("../helpers/paginatePlugin");

const {
    userTweetSelector,
    postAuthorSelector,
    quoteToSelector,
    followSelector,
    postDetailSelector,
} = require("../helpers/selectors");




const findByUsername = async (username) => {
    const user = await User.findOne({ username }).populate("bookmarks");

    const bookmarks = user.bookmarks.map((bookmark) => bookmark.tweet);
    user.bookmarks = bookmarks;

    return user;
};

const findByIdentifier = async (identifier, options = {}) => {
    let user = User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    });

    if (options.select) user = user.select(options.select);

    return await user.exec();
};

const fetchRecommendedUsers = async (userId, options) => {
    return await paginate(
        "User",
        [

            {
                $match: { _id: { $ne: userId } }
            },
            {
                $lookup: {
                    from: 'users', // the collection name
                    localField: '_id',
                    foreignField: 'following',
                    as: 'followedUsers'
                }
            },
            {
                $match: {
                    'followedUsers._id': { $ne: userId }
                }
            },
            {
                $sample: { size: options.limit }
            }

        ],
        options
    );
};

const fetchHomeFeed = async (userId, options) => {
    return await paginate(
        "User",
        [
            {
                $match: {
                    _id: userId,
                },
            },
            {
                $lookup: {
                    from: "tweets",
                    localField: "following",
                    foreignField: "author",
                    as: "followingTweets",
                },
            },
            {
                $unwind: {
                    path: "$followingTweets",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "followingTweets.author",
                    foreignField: "_id",
                    as: "followingTweets.author",
                },
            },
            {
                $unwind: {
                    path: "$followingTweets.author",
                    // preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    document: "$$ROOT.followingTweets",
                },
            },
            {
                $replaceRoot: { newRoot: "$document" },
            },
            {
                $project: {
                    replies: 1,
                    ...postAuthorSelector,
                    ...postDetailSelector,
                },
            },
        ],
        options
    );
};


const fetchTimeline = async (userId, options) => {
    return await paginate(
        "Tweet",
        [
            {
                $match: {
                    $or: [
                        {
                            retweets: { $in: [userId] }
                        },
                        {
                            $and: [
                                { author: userId },
                                { replyTo: { $eq: null } },
                            ],
                        },
                    ],
                },
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

            { $project: { document: "$$ROOT" } },
            { $replaceRoot: { newRoot: "$document" } },

            {
                $project: {
                    ...postAuthorSelector,
                    ...postDetailSelector,
                    ...quoteToSelector,
                },
            },
        ],
        options
    );
};

const fetchRepliesTimeline = async (userId, options) => {
    return await paginate(
        "Tweet",
        [
            {
                $match: {
                    author: userId,
                    $or: [
                        { replyTo: { $ne: null } },
                        { quoteTo: { $ne: null } }
                    ],
                },
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
                $project: { document: "$$ROOT" },
            },
            {
                $replaceRoot: { newRoot: "$document" },
            },
            {
                $project: {
                    ...userTweetSelector,
                },
            },
        ],
        options
    );
};

const fetchMediaTimeline = async (userId, options) => {
    return await paginate(
        "Tweet",
        [
            { $match: { author: userId, media: { $ne: [] } } },

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
                $project: {
                    document: "$$ROOT",
                    ...userTweetSelector,
                },
            },
            { $replaceRoot: { newRoot: "$document" } },
        ],
        options
    );
};

const fetchLikeTimeline = async (userId, options) => {
    return await paginate(
        "Tweet",
        [
            { $match: { likes: { $in: [userId] } } },

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
                $project: {
                    document: "$$ROOT",
                    ...userTweetSelector,
                },
            },
            { $replaceRoot: { newRoot: "$document" } },
        ],
        options
    );
};

const fetchFollowers = async (userId, options) => {
    return await paginate(
        "User",
        [
            { $match: { _id: userId } },

            {
                $lookup: {
                    from: "users",
                    localField: "followers",
                    foreignField: "_id",
                    as: "follows",
                },
            },

            {
                $unwind: {
                    path: "$follows",
                    // preserveNullAndEmptyArrays: true,
                },
            },

            { $project: { ...followSelector } },
        ],
        options
    );
};

const fetchFollowing = async (userId, options) => {
    return await paginate(
        "User",
        [
            { $match: { _id: userId } },

            {
                $lookup: {
                    from: "users",
                    localField: "following",
                    foreignField: "_id",
                    as: "follows",
                },
            },
            {
                $unwind: {
                    path: "$follows",
                    // preserveNullAndEmptyArrays: true,
                },
            },

            { $project: { ...followSelector } },
        ],
        options
    );
};

const createFollow = async (sourceId, targetId) => {
    return await Promise.all([
        User.updateOne({ _id: targetId }, { $addToSet: { followers: sourceId } }),
        User.updateOne({ _id: sourceId }, { $addToSet: { following: targetId } }),
    ]);
};

const removeFollow = async (sourceId, targetId) => {
    await Promise.all([
        User.updateOne({ _id: targetId }, { $pull: { followers: sourceId } }),
        User.updateOne({ _id: sourceId }, { $pull: { following: targetId } }),
    ]);
};

module.exports = {
    findByUsername,
    fetchRecommendedUsers,
    findByIdentifier,
    fetchFollowers,
    fetchFollowing,
    fetchHomeFeed,
    fetchTimeline,
    fetchRepliesTimeline,
    fetchMediaTimeline,
    fetchLikeTimeline,
    createFollow,
    removeFollow,
};
