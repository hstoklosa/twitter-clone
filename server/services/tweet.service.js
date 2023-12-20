const Tweet = require("../models/Tweet.model");
const paginate = require("../helpers/paginatePlugin");

const {
    userInfoSelector,
    userTweetSelector,
    postDetailSelector
} = require("../helpers/selectors");

const fetchById = async (tweetId) => {
    const tweet = await Tweet.findById(tweetId).populate({
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
    });

    return tweet;
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
    const tweet = new Tweet(data);
    await tweet.save();
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
    fetchEngagement,
    createTweet,
    createLike,
    removeLike,
};
