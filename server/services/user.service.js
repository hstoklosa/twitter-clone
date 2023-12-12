const User = require("../models/User.model");
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

    console.log(username);
    console.log(user);
    const bookmarks = user.bookmarks.map((bookmark) => bookmark.tweet);
    user.bookmarks = bookmarks;

    return user;
};

const findByIdentifier = async (identifier, options = {}) => {
    const user = User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    });

    if (options.select) user = user.select(params.select);

    return await user.exec();
};

const fetchTimeline = async (userId, options) => {
    return await paginate(
        "Tweet",
        [
            {
                $match: {
                    $and: [
                        { author: userId },
                        {
                            $or: [
                                { retweets: { $in: [userId] } },
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
                    $or: [{ replyTo: { $ne: null } }, { quoteTo: { $ne: null } }],
                },
            },

            // {
            //     $unwind: {
            //         path: "$retweets",
            //         preserveNullAndEmptyArrays: true,
            //     },
            // },

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
                    preserveNullAndEmptyArrays: true,
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
                    preserveNullAndEmptyArrays: true,
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

const removeFollow = async (targetId, sourceId) => {
    await Promise.all([
        User.updateOne({ _id: targetId }, { $pull: { followers: sourceId } }),
        User.updateOne({ _id: sourceId }, { $pull: { following: targetId } }),
    ]);
};

module.exports = {
    findByUsername,
    findByIdentifier,
    fetchFollowers,
    fetchFollowing,
    fetchTimeline,
    fetchRepliesTimeline,
    fetchMediaTimeline,
    fetchLikeTimeline,
    createFollow,
    removeFollow,
};
