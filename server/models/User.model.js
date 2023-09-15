const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
    {
        provider: {
            type: String,
            required: true,
        },
        providerId: String,
        username: {
            type: String,
            required: false,
            unique: [true, "Username already exists!"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email required"],
            unique: [true, "Email already exists!"],
            trim: true,
            validate: {
                validator: (email) => {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            },
        },
        password: {
            type: String,
            required: false,
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
            maxLength: 100,
            validate: {
                // Regular expression to validate the URL
                validator: (url) => {
                    return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
                },
                message: (props) => `${props.value} is not a valid URL!`,
            },
        },
        location: {
            type: String,
            maxLength: 30,
        },
        followers: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

// static methods
userSchema.statics.addUser = (data) => {
    const user = new this(data);
    return user.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
