const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookmarkSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        tweet: {
            type: ObjectId,
            ref: "Tweet",
            required: true,
        },
    },
    { timestamps: true }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
