exports.userInfoSelector = {
    provider: 0,
    password: 0,
    updatedAt: 0,
};

exports.followsSelector = {
    username: 1,
    displayName: 1,
    followers: 1,
    following: 1,
    profileImageURL: 1,
    bio: 1,
};

exports.postAuthorSelector = {
    "author.username": 1,
    "author.displayName": 1,
    "author.profileImageURL": 1,
};

exports.quoteSelector = {
    "quoteTo.author.username": 1,
    "quoteTo.author.displayName": 1,
    "quoteTo.author.profileImageURL": 1,
};

exports.replySelector = {
    "replyTo.author.username": 1,
    "replyTo.author.displayName": 1,
    "replyTo.author.profileImageURL": 1,
};

exports.userTweetSelector = {
    ...this.postAuthorSelector,
    ...this.quoteSelector,
    ...this.replySelector,
};
