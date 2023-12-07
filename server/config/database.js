const mongoose = require("mongoose");

const connectDB = async (listener) => {
    mongoose.connection
        .on("error", console.error)
        .on("disconnected", connectDB)
        .once("open", listener);

    return mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
