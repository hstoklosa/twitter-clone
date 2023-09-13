const { ObjectId } = require("mongodb");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// TODO: INDEXING

const tweetSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            maxLength: [280, "The tweet can't be longer than 280 characters."],
            validate: {
                validator: (c) => {
                    return c.trim().length > 0;
                },
                message: "The tweet can't be empty.",
            },
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // add array structure for more than 1 media per tweet
        media: [
            {
                url: {
                    type: String,
                    required: true,
                },
                mediaType: {
                    type: String,
                    required: true,
                    // enum: ["image", "gif"],
                    // message: "Invalid media type.",
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
        },
        inReplyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        retweets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tweet",
            },
        ],
    },
    { timestamps: true }
);

// tweetSchema.index({author: 1, hashtags: 1});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
