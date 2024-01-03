const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Tweet = require("./Tweet.model");
const Bookmark = require("./Tweet.model");

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
            minLength: [3, "Username must be at least 3 characters long!"],
            maxlength: [15, "Username should be at most 15 characters long!"],
            validate: {
                validator: (username) => {
                    return /^[0-9a-zA-Z_.-]+$/.test(username);
                },
                message: props => `${props.value} is not a valid username. Username must only contain numbers, letters, ".", "-", "_"`,
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
        verified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: false,
            minLength: [8, "Password must be at least 8 characters long!"],
            validate: {
                validator: (password) => {
                    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#\$%\^&*\(\)_\+\-\[\]{};':"\\|,.<>\/?]{8,}$/.test(password);
                },
                message: (props) => `A password must have at least 8 characters, including letters and numbers.`,
            },
        },
        profileImageURL: String,
        bannerURL: String,
        displayName: String,
        bio: {
            type: String,
            maxLength: 160,
        },
        website: {
            type: String,
            default: null,
            maxLength: 100,
            // validate: {
            //     validator: (url) => {
            //         return String(url)
            //             .toLowerCase()
            //             .match(/^((http|https):\/\/)?[^ "]+$/);
            //     },
            //     message: (props) => `${props.value} is not a valid URL!`,
            // },
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
 * Virtual fields
 *
 */

userSchema.virtual("bookmarks", {
    ref: "Bookmark",
    localField: "_id",
    foreignField: "user",
});


/**
 *
 * Middlewares (cascading delete...)
 *
 */

userSchema.pre('save', async function (next) {

    // hash the password if new/modified
    if (!this.isModified('password'))
        return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        return next(err);
    }

    next();
});

userSchema.pre('findOneAndDelete', async function (next) {
    const userId = this.getQuery()['_id'];

    await Tweet.deleteMany({ author: userId });
    await Tweet.updateMany({ retweets: userId }, { $pull: { retweets: userId } });
    await Tweet.updateMany({ likes: userId }, { $pull: { likes: userId } });
    await Bookmark.deleteMany({ user: userId });

    next();
});

/**
 *
 * Static methods
 *
 */

userSchema.statics.addUser = async (data) => {
    const user = new User(data);
    return await user.save();
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

userSchema.methods.comparePassword = async function (candidatePassword) {
    return (await bcrypt.compare(candidatePassword, this.password));
};


// To ensure virtuals are included when you convert a document to JSON
userSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, { __v, password, ...rest }, options) => rest,
});

userSchema.set("toObject", { virtuals: true });


const User = mongoose.model("User", userSchema);

module.exports = User;
