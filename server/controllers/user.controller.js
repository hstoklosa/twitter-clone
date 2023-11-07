const fs = require("fs");
const path = require("path");

const User = require("../models/User.model");
const Tweet = require("../models/Tweet.model");

const asyncHandler = require("../middlewares/asyncHandler");
const paginate = require("../helpers/paginatePlugin");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");

const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
        return next(new NotFoundError(`User with the username ${username} was not found!`));
    }

    const parsedUrl = new URL(user.profileImageURL);
    const localFilePath = path.join(__dirname, "./uploads", parsedUrl.pathname);

    // check if static file exists w/ non-blocking I/O access
    fs.access(localFilePath, fs.constants.F_OK, async (err) => {
        if (err) {
            user.profileImageURL = `${process.env.SERVER_URL}/uploads/default_profile.png`;
            await user.save();
        }
    });

    return res.status(200).json(user._doc);
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

const followUser = asyncHandler(async (req, res, next) => {
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

const getTweets = asyncHandler(async (req, res, next) => {
    const { username } = req.params;
    const { page, limit, skip } = req.pagination;

    const user = await User.findOne({ username });

    if (!user) {
        return next(new NotFoundError("Can't retrieve tweets since the user does not exist!"));
    }

    const tweets = await Tweet.find({ author: user._id })
        .populate("author")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return res.status(200).json({
        tweets: tweets || [],
    });
});

const getLikedTweets = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    const likedTweets = await Tweet.find({ likes: { $in: [userId] } })
        .populate("author")
        .sort({
            createdAt: -1,
        });

    return res.status(200).json({
        data: {
            likedTweets,
        },
    });
});

module.exports = {
    getUser,
    updateUser,
    getTweets,
    getLikedTweets,
    followUser,
    unfollowUser,
};
