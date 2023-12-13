const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongoose").Types;

const User = require("../models/User.model");
const asyncHandler = require("../middlewares/asyncHandler");
const userService = require("../services/user.service");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");

const getUser = asyncHandler(async (req, res, next) => {
    const { username } = req.params;

    if (!(await User.exists({ username })))
        return next(new NotFoundError("The user was not found!"));

    const user = await userService.findByUsername(username);

    // console

    if (!user)
        return next(
            new NotFoundError(`The username ${username} couldn't be found.`)
        );

    // const parsedUrl = new URL(user.profileImageURL);
    // const localFilePath = path.join(__dirname, "./uploads", parsedUrl.pathname);

    // // check if static file exists w/ non-blocking I/O operation
    // fs.access(localFilePath, fs.constants.F_OK, async (err) => {
    //     if (err) {
    //         user.profileImageURL = `${process.env.SERVER_URL}/uploads/default_profile.png`;
    //         await user.save();
    //     }
    // });

    return res.status(200).json(user);
});

const getFollowers = asyncHandler(async (req, res, next) => {
    const relevantUser = await userService.findByUsername(req.params.username);

    if (!relevantUser)
        return next(new NotFoundError("The specified user could not found!"));

    const response = await userService.fetchFollowers(
        relevantUser._id,
        req.pagination
    );

    return res.status(200).json(response);
});

const getFollowing = asyncHandler(async (req, res, next) => {
    const relevantUser = await userService.findByUsername(req.params.username);

    if (!relevantUser)
        return next(new NotFoundError("The specified user could not found!"));

    const response = await userService.fetchFollowing(
        relevantUser._id,
        req.pagination
    );

    return res.status(200).json(response);
});

const getProfileTimeline = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user)
        return next(
            new NotFoundError("Can't retrieve tweets since the user does not exist!")
        );

    const response = await userService.fetchTimeline(user._id, req.pagination);

    return res.status(200).json(response);
});

const getRepliesTimeline = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(
            new NotFoundError("Can't retrieve tweets since the user does not exist!")
        );
    }

    const response = await userService.fetchRepliesTimeline(
        user._id,
        req.pagination
    );

    return res.status(200).json(response);
});

const getMediaTimeline = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user)
        return next(
            new NotFoundError("Can't retrieve tweets since the user does not exist!")
        );

    const response = await userService.fetchMediaTimeline(user._id, req.pagination);

    return res.status(200).json(response);
});

const getLikesTimeline = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (!(await User.exists({ _id: userId })))
        return next(
            new NotFoundError("Can't retrieve tweets since the user does not exist!")
        );

    const response = await userService.fetchLikeTimeline(userId, req.pagination);

    return res.status(200).json(response);
});

const followUser = asyncHandler(async (req, res, next) => {
    const { userId: sourceUserId } = req.params;
    const { targetUserId } = req.body;

    console.log(sourceUserId, targetUserId);

    if (!(await User.exists({ _id: sourceUserId })))
        return next(new NotFoundError("Source user not found!"));

    if (!(await User.exists({ _id: targetUserId })))
        return next(new NotFoundError("Target user not found!"));

    await userService.createFollow(sourceUserId, targetUserId);

    return res.status(200).json({
        isFollowing: true,
    });
});

const unfollowUser = asyncHandler(async (req, res, next) => {
    const { targetUserId } = req.body;
    const { userId: sourceUserId } = req.params;

    if (!(await User.exists({ _id: sourceUserId })))
        return next(new NotFoundError("Source user not found!"));

    if (!(await User.exists({ _id: targetUserId })))
        return next(new NotFoundError("Target user not found!"));

    await userService.removeFollow(sourceUserId, targetUserId);

    return res.status(200).json({
        isFollowing: false,
    });
});

const updateUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const { _id: currentUserId } = req.user;

    if (currentUserId.toString() !== userId)
        return next(new UnauthorizedError("You're not allowed to alter this user."));

    const { displayName, bio, location, website } = req.body;

    const updateData = {
        displayName,
        bio,
        location,
        website,
    };

    if (req.files["profileImage"])
        updateData.profileImageURL = `${process.env.SERVER_ORIGIN}/${req.files.profileImage[0].path}`;

    if (req.files["bannerImage"])
        updateData.bannerURL = `${process.env.SERVER_ORIGIN}/${req.files.bannerImage[0].path}`;

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
