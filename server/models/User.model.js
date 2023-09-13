let mongoose = require("mongoose");
let Schema = mongoose.Schema;

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
                validator: (url) => {
                    // Regular expression to validate URL
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
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

// Static methods related to User
userSchema.statics.addGoogleUser = function (data) {
    const user = new this(data);
    return user.save();
};

userSchema.statics.addLocalUser = function (data) {
    const user = new this(data);
    return user.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
