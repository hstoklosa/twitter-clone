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
        },
        email: {
            type: String,
            required: [true, "Email required"],
            unique: [true, "Email already exists!"],
        },
        password: {
            type: String,
            required: false,
        },
        profileImageURL: String,
        displayName: String,
        dob: {
            type: Date,
            required: true,
        },
        bio: String,
        location: String,
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
