exports.userInfoSelector = {
    provider: 0,
    password: 0,
    updatedAt: 0,
};

exports.postDetailSelector = {
    content: 1,
    repliesCount: 1,
    likes: 1,
    retweets: 1,
    media: 1,
    createdAt: 1,

};

exports.postAuthorSelector = {
    "author._id": 1,
    "author.username": 1,
    "author.displayName": 1,
    "author.profileImageURL": 1,
    "author.followers": 1,
    "author.following": 1,
};

exports.followSelector = {
    _id: "$follows._id",
    username: "$follows.username",
    displayName: "$follows.displayName",
    followers: "$follows.followers",
    following: "$follows.following",
    profileImageURL: "$follows.profileImageURL",
    bio: "$follows.bio",
};

exports.quoteToSelector = {
    "quoteTo._id": 1,
    "quoteTo.content": 1,
    "quoteTo.createdAt": 1,
    "quoteTo.media": 1,
    "quoteTo.author.username": 1,
    "quoteTo.author.displayName": 1,
    "quoteTo.author.profileImageURL": 1,
};

exports.replyToSelector = {
    "replyTo.author.username": 1,
    "replyTo.author.displayName": 1,
    "replyTo.author.profileImageURL": 1,
};

exports.userTweetSelector = {
    ...this.postDetailSelector,
    ...this.postAuthorSelector,
    ...this.quoteToSelector,
    ...this.replyToSelector,
};

exports.engagementSelector = {
    _id: 1,
    username: 1,
    displayName: 1,
    profileImageURL: 1,
    bio: 1,
    followers: 1,
    following: 1,
};
