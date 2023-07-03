let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: false,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "email required"],
            unique: [true, "email already registered"],
        },
        password: {
            type: String,
            required: false,
        },
        provider: String,
        providerId: String,
        displayName: String,
        bio: String,
        profileImageURL: String,
        location: String,
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
