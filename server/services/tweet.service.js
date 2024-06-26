const Tweet = require("../models/Tweet.model");
const paginate = require("../helpers/paginatePlugin");

const {
    userInfoSelector,
    userTweetSelector,
    postDetailSelector
} = require("../helpers/selectors");

const fetchById = async (tweetId) => {
    return (await Tweet.findById(tweetId).populate({
        path: "author",
        select: userInfoSelector,
    }).populate({
        path: "replyTo",
        select: postDetailSelector,
        populate: {
            path: "author",
            select: userInfoSelector,
        }
    }).populate({
        path: "quoteTo",
        select: postDetailSelector,
        populate: {
            path: "author",
            select: userInfoSelector,
        }
    }));
};

const fetchByQuery = async (query, options) => {
    return (await paginate(
        "Tweet",
        [
            { $unwind: '$hashtags' },
            {
                $match: {
                    $or: [
                        { hashtags: { $regex: query } },
                        { content: { $regex: query } }
                    ]
                }
            },

            {
                $group: {
                    _id: '$_id',
                    uniqueData: { $first: '$$ROOT' }
                },

            },

            {
                $replaceRoot: { newRoot: '$uniqueData' }
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
                }
            },



            {
                $project: {
                    ...userTweetSelector
                }
            }
        ],
        options
    ));
}

const fetchReplies = async (tweetId, options) => {
    return (await paginate(
        "Tweet",
        [
            { $match: { replyTo: tweetId } },

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

            { $project: { document: "$$ROOT", ...userTweetSelector } },
            { $replaceRoot: { newRoot: "$document" } },
        ],
        options
    ));
};

const fetchEngagement = async (req, res, next) => {
    const parsedId = new ObjectId(tweetId);

    const field = query.likes ? "likes" : query.retweets ? "retweets" : "quotes";
    const filter = field === "quotes" ? { quoteTo: parsedId } : { _id: parsedId };

    const response = await paginate(
        "Tweet",
        [
            { $match: filter },

            {
                $lookup: {
                    from: "users",
                    localField: `${field}`,
                    foreignField: "_id",
                    as: `${field}`,
                },
            },
            {
                $unwind: {
                    path: `$${field}`,
                },
            },

            { $replaceRoot: { newRoot: `$${field}` } },
            { $project: { ...engagementSelector } },
        ],
        req.pagination
    );

    return res.status(200).json(response);
};

const createTweet = async (data) => {
    return (await new Tweet(data).save());
}

const createLike = async (tweetId, userId) => {
    return await Tweet.findByIdAndUpdate(tweetId, {
        $addToSet: { likes: userId },
    });
};

const removeLike = async (tweetId, userId) => {
    return await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { likes: userId },
    });
};

module.exports = {
    fetchById,
    fetchByQuery,
    fetchReplies,
    fetchEngagement,
    createTweet,
    createLike,
    removeLike,
};