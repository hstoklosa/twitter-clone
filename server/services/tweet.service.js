const Tweet = require("../models/Tweet.model");
const paginate = require("../helpers/paginatePlugin");

const { userInfoSelector } = require("../helpers/selectors");

const fetchById = async (tweetId) => {
    return await Tweet.findById(tweetId).populate("author").select(userInfoSelector);
};

const createLike = async (tweetId, userId) => {
    // Update the array only if the value doesn't exist yet
    return await Tweet.findByIdAndUpdate(tweetId, {
        $addToSet: { likes: userId },
    });
};

const removeLike = async (tweetId, userId) => {
    return await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { likes: userId },
    });
};

const createRetweet = async (tweetId, userId) => {};

const removeRetweet = async (tweetId, userId) => {};

module.exports = {
    fetchById,
    createLike,
    removeLike,
    createRetweet,
    removeRetweet,
};
