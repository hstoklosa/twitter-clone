const fs = require("fs");
const path = require("path");

const { ObjectId } = require("mongoose").Types;
const User = require("../models/User.model");
const Tweet = require("../models/Tweet.model");

const asyncHandler = require("../middlewares/asyncHandler");
const paginate = require("../helpers/paginatePlugin");
const {
    userTweetSelector,
    postAuthorSelector,
    quoteSelector,
    followsSelector,
} = require("../helpers/selectors");
const { userLookup, quoteLookup, replyLookup } = require("../helpers/aggregation");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");

const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
        return next(new NotFoundError(`User with the username ${username} was not found!`));
    }

    const parsedUrl = new URL(user.profileImageURL);
    const localFilePath = path.join(__dirname, "./uploads", parsedUrl.pathname);

    // check if static file exists w/ non-blocking I/O operation
    fs.access(localFilePath, fs.constants.F_OK, async (err) => {
        if (err) {
            user.profileImageURL = `${process.env.SERVER_URL}/uploads/default_profile.png`;
            await user.save();
        }
    });

    return res.status(200).json(user._doc);
});

const getFollowers = asyncHandler(async (req, res, next) => {
    const relevantUser = await User.findOne({ username: req.params.username });

    if (!relevantUser) return next(new NotFoundError("User not found!"));

    const pipeline = [
        {
            $match: {
                _id: relevantUser._id,
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "followers",
                foreignField: "_id",
                as: "populatedFollowers",
            },
        },

        {
            $unwind: {
                path: "$populatedFollowers",
                preserveNullAndEmptyArrays: true,
            },
        },

        { $project: { document: "$populatedFollowers" } },
        { $replaceRoot: { newRoot: "$document" } },
        { $project: followsSelector },
    ];

    const response = await paginate(User, pipeline, req.pagination);

    return res.status(200).json(response);
});

const getFollowing = asyncHandler(async (req, res, next) => {
    const relevantUser = await User.findOne({ username: req.params.username });

    if (!relevantUser) return next(new NotFoundError("User not found!"));

    const pipeline = [
        {
            $match: {
                _id: relevantUser._id,
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "following",
                foreignField: "_id",
                as: "populatedFollowings",
            },
        },

        {
            $unwind: {
                path: "$populatedFollowings",
                preserveNullAndEmptyArrays: true,
            },
        },

        { $project: { document: "$populatedFollowings" } },
        { $replaceRoot: { newRoot: "$document" } },
        { $project: followsSelector },
    ];

    const response = await paginate(User, pipeline, req.pagination);

    return res.status(200).json(response);
});

const getProfileTimeline = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user)
        return next(new NotFoundError("Can't retrieve tweets since the user does not exist!"));

    const pipeline = [
        {
            $match: {
                $and: [
                    { author: user._id },
                    { $or: [{ retweets: { $in: [user._id] } }, { replyTo: { $eq: null } }] },
                ],
            },
        },

        ...userLookup,
        ...quoteLookup,

        {
            $project: {
                document: "$$ROOT",
                ...postAuthorSelector,
                ...quoteSelector,
            },
        },
        {
            $replaceRoot: { newRoot: "$document" },
        },
    ];

    const response = await paginate(Tweet, pipeline, req.pagination);

    return res.status(200).json(response);
});

const getRepliesTimeline = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(new NotFoundError("Can't retrieve tweets since the user does not exist!"));
    }

    const pipeline = [
        {
            $match: {
                author: user._id,
                $or: [{ replyTo: { $ne: null } }, { quoteTo: { $ne: null } }],
            },
        },

        ...userLookup,
        ...replyLookup,
        ...quoteLookup,

        {
            $project: {
                document: "$$ROOT",
                ...userTweetSelector,
            },
        },
        {
            $replaceRoot: { newRoot: "$document" },
        },
    ];

    const response = await paginate(Tweet, pipeline, req.pagination);

    return res.status(200).json(response);
});

const getMediaTimeline = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(new NotFoundError("Can't retrieve tweets since the user does not exist!"));
    }

    const pipeline = [
        {
            $match: {
                author: user._id,
                media: { $ne: [] },
            },
        },

        ...userLookup,
        ...replyLookup,
        ...quoteLookup,

        {
            $project: {
                document: "$$ROOT",
                ...userTweetSelector,
            },
        },
        {
            $replaceRoot: { newRoot: "$document" },
        },
    ];

    const response = await paginate(Tweet, pipeline, req.pagination);

    return res.status(200).json(response);
});

const getLikesTimeline = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (!(await User.exists({ _id: userId })))
        return next(new NotFoundError("Can't retrieve tweets since the user does not exist!"));

    const pipeline = [
        {
            $match: {
                likes: { $in: [new ObjectId(userId)] },
            },
        },

        ...userLookup,
        ...replyLookup,
        ...quoteLookup,

        {
            $project: {
                document: "$$ROOT",
                ...userTweetSelector,
            },
        },
        {
            $replaceRoot: { newRoot: "$document" },
        },
    ];

    const response = await paginate(Tweet, pipeline, req.pagination);

    return res.status(200).json(response);
});

const followUser = asyncHandler(async (req, res, next) => {
    const { targetUserId } = req.body;
    const sourceUserId = req.params.userId;

    if (!(await User.exists({ _id: sourceUserId })))
        return next(new NotFoundError("Source user not found!"));

    if (!(await User.exists({ _id: targetUserId })))
        return next(new NotFoundError("Target user not found!"));

    await Promise.all([
        User.updateOne({ _id: targetUserId }, { $push: { followers: sourceUserId } }),
        User.updateOne({ _id: sourceUserId }, { $push: { following: targetUserId } }),
    ]);

    return res.status(200).json({
        isFollowing: true,
    });
});

const unfollowUser = asyncHandler(async (req, res, next) => {
    const { targetUserId } = req.body;
    const sourceUserId = req.params.userId;

    if (!(await User.exists({ _id: sourceUserId })))
        return next(new NotFoundError("Source user not found!"));

    if (!(await User.exists({ _id: targetUserId })))
        return next(new NotFoundError("Target user not found!"));

    await Promise.all([
        User.updateOne({ _id: targetUserId }, { $pull: { followers: sourceUserId } }),
        User.updateOne({ _id: sourceUserId }, { $pull: { following: targetUserId } }),
    ]);

    return res.status(200).json({
        isFollowing: false,
    });
});

const updateUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const currentUser = req.user;

    if (currentUser._id.toString() !== userId) {
        return next(new UnauthorizedError("You are not allowed to edit this user!"));
    }

    const { displayName, bio, location, website } = req.body;

    const updateData = {
        displayName,
        bio,
        location,
        website,
    };

    if (req.files["profileImage"])
        updateData.profileImageURL = `http://localhost:8080/${req.files.profileImage[0].path}`;

    if (req.files["bannerImage"])
        updateData.bannerURL = `http://localhost:8080/${req.files.bannerImage[0].path}`;

    await User.findByIdAndUpdate(userId, updateData);

    return res.status(200).json({
        isUpdated: true,
    });
});

module.exports = {
    getUser,
    getFollowing,
    getFollowers,
    getProfileTimeline,
    getRepliesTimeline,
    getMediaTimeline,
    getLikesTimeline,
    followUser,
    unfollowUser,
    updateUser,
};
