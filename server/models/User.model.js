const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const providerSchema = new Schema({
    providerId: String,
    providerName: {
        type: String,
        required: true,
    },
});

const userSchema = new Schema(
    {
        provider: {
            type: providerSchema,
            required: false,
        },
        username: {
            type: String,
            required: false,
            unique: [true, "Username already exists!"],
            trim: true,
            lowercase: true,
            validate: {
                validator: (username) => {
                    return String(username)
                        .toLowerCase()
                        .match(/^[0-9a-zA-Z_.-]+$/);
                },
                message: (props) =>
                    `${props.value} is not a valid username. Username must only contain numbers, letters, ".", "-", "_"`,
            },
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists!"],
            trim: true,
            lowercase: true,
            validate: {
                validator: (email) => {
                    return String(email)
                        .toLowerCase()
                        .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            },
        },
        password: {
            type: String,
            required: false,
            minLength: [8, "Password must be at least 8 characters long!"],
        },
        profileImageURL: String,
        bannerURL: String,
        displayName: String,
        dob: {
            type: Date,
            required: true,
        },
        bio: {
            type: String,
            maxLength: 160,
        },
        website: {
            type: String,
            default: null,
            maxLength: 100,
            validate: {
                validator: (url) => {
                    return String(url)
                        .toLowerCase()
                        .match(/^((http|https):\/\/)?[^ "]+$/);
                },
                message: (props) => `${props.value} is not a valid URL!`,
            },
        },
        location: {
            type: String,
            default: null,
            maxLength: 30,
        },
        followers: {
            type: [ObjectId],
            ref: "User",
            default: [],
        },
        following: {
            type: [ObjectId],
            ref: "User",
            default: [],
        },
        retweets: {
            type: [ObjectId],
            ref: "Tweet",
            default: [],
        },
    },
    { timestamps: true }
);

// userSchema.index({ username: 1, email: 1 });

/**
 *
 * Static methods
 *
 */

userSchema.statics.addUser = (data) => {
    const user = new this(data);
    return user.save();
};

/**
 *
 * Instance methods
 *
 */
userSchema.methods.addRetweet = function (tweetId) {
    const isRetweeted = this.retweets.some((id) => id === tweetId);

    if (!isRetweeted) {
        this.retweets.push(tweetId);
        return this.save();
    }

    return Promise.resolve(this);
};

userSchema.methods.deleteRetweet = function (tweetId) {
    const isRetweeted = this.retweets.some((id) => id.equals(tweetId));

    if (isRetweeted) {
        this.retweets.remove(tweetId);
        return this.save();
    }

    return Promise.resolve(this);
};

/**
 *
 * Virtual fields
 *
 */

userSchema.virtual("bookmarks", {
    ref: "Bookmark",
    localField: "_id",
    foreignField: "user",
});

// To ensure virtuals are included when you convert a document to JSON
userSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, { __v, password, ...rest }, options) => rest,
});

userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
