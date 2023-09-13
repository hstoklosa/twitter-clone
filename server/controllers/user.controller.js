const User = require("../models/User.model");
const Tweet = require("../models/Tweet.model");

const asyncHandler = require("../middlewares/asyncHandler");
const {
    NotFoundError,
    UnauthorizedError,
} = require("../config/ApplicationError");

const getUser = asyncHandler(async (req, res, next) => {
    const { username } = req.params;

    const user = await User.findOne({
        username,
    });

    if (!user) {
        return next(
            new NotFoundError(
                `User with the username ${username} was not found!`
            )
        );
    }

    const tweetsCount = await Tweet.countDocuments({
        author: user._id,
    });

    const likesCount = await Tweet.countDocuments({
        likes: {
            $in: [user._id],
        },
    });

    const mediaCount = await Tweet.countDocuments({
        author: user._id,
        media: {
            $ne: [],
        },
    });

    return res.status(200).json({
        user: {
            ...user._doc,
            tweetsCount,
            likesCount,
            mediaCount,
        },
    });
});

const updateUser = asyncHandler(async (req, res, next) => {
    const { _id: currUserId } = req.user;
    const { userId } = req.params;

    if (currUserId.toString() !== userId) {
        return next(
            new UnauthorizedError("You are not allowed to edit this user!")
        );
    }

    const { displayName, bio, location, website } = req.body;

    const updateData = {
        displayName,
        bio,
        location,
        website,
    };

    if (req.files[`profileImage`]) {
        updateData.profileImageURL = `http://localhost:8080/${req.files.profileImage[0].path}`;
    }

    if (req.files[`bannerImage`]) {
        updateData.bannerURL = `http://localhost:8080/${req.files.bannerImage[0].path}`;
    }

    console.log("UPDATE_DATA: ", updateData);
    console.log("FILES: ", req.files);

    const user = await User.findOneAndUpdate({ _id: userId }, updateData, {
        new: true,
    });

    return res.status(200).json({
        user: user,
    });
});

const followUser = asyncHandler(async (req, res, next) => {
    const sourceUser = await User.findById(req.params.userId);
    const targetUser = await User.findById(req.body.targetUserId);

    console.log(sourceUser, targetUser, req.body.targetUserId);

    if (!sourceUser || !targetUser) {
        return next(new NotFoundError("User/s not found!"));
    }

    await User.updateOne(
        { _id: targetUser },
        { $push: { followers: sourceUser._id } }
    );
    await User.updateOne(
        { _id: sourceUser },
        { $push: { following: targetUser._id } }
    );

    return res.status(200).json({
        data: {
            isFollowing: true,
        },
    });
});

const unfollowUser = asyncHandler(async (req, res, next) => {
    const sourceUser = await User.findById(req.params.userId);
    const targetUser = await User.findById(req.body.targetUserId);

    console.log(req.body, req.params);

    if (!sourceUser || !targetUser) {
        return next(new NotFoundError("User/s not found!"));
    }

    await User.updateOne(
        { _id: targetUser },
        { $pull: { followers: sourceUser._id } }
    );
    await User.updateOne(
        { _id: sourceUser },
        { $pull: { following: targetUser._id } }
    );

    return res.status(200).json({
        data: {
            isFollowing: false,
        },
    });
});

const getTweets = asyncHandler(async (req, res, next) => {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
        return next(
            new NotFoundError(
                "Can't retrieve tweets since the user does not exist!"
            )
        );
    }

    const tweets = await Tweet.find({ author: user._id })
        .populate("author")
        .sort({ createdAt: -1 });

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

    // TODO: Trim the liked tweets?
    console.log(likedTweets);

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
