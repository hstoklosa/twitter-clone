const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const emailTokenSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true });


const EmailToken = mongoose.model("EmailToken", emailTokenSchema);

module.exports = EmailToken;