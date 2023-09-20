const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tweetSchema = new Schema(
    {
        content: {
            type: String,
            required: false,
            maxLength: [280, "The tweet can't be longer than 280 characters."],
            validate: {
                validator: (c) => {
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
        mentions: [
            {
                type: ObjectId,
                ref: "User",
                set: (m) => m.toLowerCase().replaceAll("@", ""),
            },
        ],
        hashtags: [
            {
                type: String,
                set: (h) => h.toLowerCase().replaceAll("#", ""),
            },
        ],
        visibility: {
            type: String,
            enum: ["EVERYONE", "FOLLOWED", "MENTIONED"],
            default: "EVERYONE",
        },
        retweetId: {
            type: ObjectId,
            ref: "Tweet",
        },
        inReplyTo: {
            type: ObjectId,
            ref: "Tweet",
        },
        likes: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
        retweets: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
        replies: [
            {
                type: ObjectId,
                ref: "Tweet",
            },
        ],
    },
    { timestamps: true }
);

// tweetSchema.index({author: 1, hashtags: 1});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
