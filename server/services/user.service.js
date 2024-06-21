const User = require("../models/User.model");
const paginate = require("../helpers/paginatePlugin");

const {
    userTweetSelector,
    postAuthorSelector,
    quoteToSelector,
    followSelector,
    postDetailSelector,
    userInfoSelector
} = require("../helpers/selectors");


const findByUsername = async (username) => {
    const userAggregation = await User.aggregate([
        {
            $match: { username: username }
        }, // Match the user by username

        {
            $lookup: {
                from: "tweets",
                let: { id: "$_id" }, // Assigns the _id of the current document to a variable for use in the sub-pipeline
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $or: [
                                    { $in: ["$$id", "$retweets"] },
                                    {
                                        $and: [
                                            { $eq: ["$$id", "$author"] },
                                            { $eq: ["$replyTo", null] }
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    { $count: "count" }
                ],
                as: "tweetCount" // Places the count in an array named replies_count in the original document
            }
        },

        {
            $lookup: {
                from: "tweets",
                let: { id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$$id", "$author"]
                                    },
                                    {
                                        $ne: ["$media", []]
                                    }
                                ]
                            }
                        }
                    },
                    { $count: "count" }
                ],
                as: "mediaCount"
            }
        },

        {
            $lookup: {
                from: "tweets",
                let: { id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ["$$id", "$likes"]
                            }
                        }
                    },
                    { $count: "count" }
                ],
                as: "likeCount"
            }
        },

        {
            $lookup: {
                from: "bookmarks", // Assuming 'bookmarks' is a collection name; adjust as necessary
                localField: "_id", // Adjust based on your schema
                foreignField: "user", // Adjust based on your schema
                as: "bookmarks"
            }
        },

        {
            $lookup: {
                from: "tweets",
                localField: "pin",
                foreignField: "_id",
                as: "pin"
            }
        },

        {
            $unwind: {
                path: "$pin",
                preserveNullAndEmptyArrays: true,
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "pin.author",
                foreignField: "_id",
                as: "pin.author"
            }
        },

        {
            $unwind: {
                path: "$pin.author",
                preserveNullAndEmptyArrays: true,
            }
        },

        {
            $lookup: {
                from: "tweets",
                localField: "pin.replyTo",
                foreignField: "_id",
                as: "replyTo"
            }
        },

        {
            $unwind: {
                path: "$replyTo",
                preserveNullAndEmptyArrays: true,
            }
        },

        {
            $lookup: {
                from: "tweets",
                localField: "pin.quoteTo",
                foreignField: "_id",
                as: "quoteTo"
            }
        },

        {
            $unwind: {
                path: "$quoteTo",
                preserveNullAndEmptyArrays: true,
            }
        },

        {
            $addFields: {
                bookmarks: {
                    $map: {
                        input: "$bookmarks",
                        as: "bookmark",
                        in: "$$bookmark.tweet" // Extract the tweet ObjectId from each bookmark
                    }
                },
                pin: {
                    $cond: {
                        if: { $eq: ["$pin", {}] },
                        then: null,
                        else: "$pin"
                    }
                },
                tweetCount: { $arrayElemAt: ["$tweetCount.count", 0] },
                mediaCount: { $arrayElemAt: ["$mediaCount.count", 0] },
                likeCount: { $arrayElemAt: ["$likeCount.count", 0] }
            }
        },
    ]);

    // Assuming the aggregation returns an array, you may need to select the first element for a single user object
    const user = userAggregation[0] ? userAggregation[0] : null;

    return user;
};

const findByIdentifier = async (identifier, options = {}) => {
    let user = User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    });

    if (options.select)
        user = user.select(options.select);

    return await user.exec();
};

const findFromQuery = async (query, options) => {
    return await paginate(
        "User",
        [
            {
                $match: {
                    $or: [
                        { username: { $regex: query } },
                        { displayName: { $regex: query } },
                    ],
                },
            },
            // {
            //     $project: {
            //         ...userTweetSelector,
            //     },
            // },
        ],
        options
    );
}

const fetchRecommendedUsers = async (userId, options) => {
    return await paginate(
        "User",
        [

            {
                $match: { $and: [{ _id: { $ne: userId } }, { verified: true }] }
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
        "Tweet",
        [
            {
                $match: {
                    replyTo: { $eq: null }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },

            {
                $unwind: {
                    path: "$author"
                }
            },


            {
                $lookup: {
                    from: "tweets",
                    localField: "replyTo",
                    foreignField: "_id",
                    as: "replyTo"
                }
            },

            {
                $unwind: {
                    path: "$replyTo",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $lookup: {
                    from: "tweets",
                    localField: "quoteTo",
                    foreignField: "_id",
                    as: "quoteTo"
                }
            },

            {
                $unwind: {
                    path: "$quoteTo",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $project: {
                    // replies: 1,
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
    findFromQuery,
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
