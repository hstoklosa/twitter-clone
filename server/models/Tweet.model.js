const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tweetSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
            maxLength: [280, "The tweet can't be longer than 280 characters."],
            validate: {
                validator: function (c) {
                    return c.trim().length > 0;
                },
                message: "The tweet can't be empty.",
            },
        },
        author: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        media: [
            {
                url: {
                    type: String,
                    required: true,
                },
                mediaType: {
                    type: String,
                    required: true,
                    enum: ["image", "gif"],
                    message: "Invalid media type.",
                },
            },
        ],
        mentions: {
            type: [String],
            default: [],
            set: (mentions) => {
                return mentions.map((m) => m.toLowerCase().replace("@", ""));
            },
        },

        hashtags: {
            type: [String],
            default: [],
            set: (hashtags) => {
                return hashtags.map((h) => h.toLowerCase().replace("#", ""));
            },
        },

        visibility: {
            type: String,
            enum: ["EVERYONE", "FOLLOWED", "MENTIONED"],
            default: "EVERYONE",
        },
        replyTo: {
            type: ObjectId,
            ref: "Tweet",
            default: null,
        },
        quoteTo: {
            type: ObjectId,
            ref: "Tweet",
            default: null,
        },
        repliesCount: {
            type: Number,
            default: 0,
        },
        likes: {
            type: [ObjectId],
            ref: "User",
            default: [],
        },
        retweets: {
            type: [ObjectId],
            ref: "User",
            default: [],
        },
    },
    { timestamps: true }
);

// tweetSchema.index({author: 1, hashtags: 1});

tweetSchema.methods.updateRepliesCount = async function () {
    this.repliesCount = await mongoose.model("Tweet").countDocuments({
        replyTo: this._id,
    });

    return this.save();
};

tweetSchema.methods.addRetweet = function (userId) {
    const isRetweeted = this.retweets.some((id) => id === userId);

    if (!isRetweeted) {
        this.retweets.push(userId);
        return this.save();
    }

    return Promise.resolve(this);
};

tweetSchema.methods.deleteRetweet = function (userId) {
    const isRetweeted = this.retweets.some((id) => id.equals(userId));

    if (isRetweeted) {
        this.retweets.remove(userId);
        return this.save();
    }

    return Promise.resolve(this);
};

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
