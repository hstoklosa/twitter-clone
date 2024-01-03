const mongoose = require("mongoose");
const User = require("../models/User.model");

const connectDB = async (listener) => {
    try {
        const dbConn = mongoose.connection;

        dbConn
            .on("error", console.error)
            .on("disconnected", connectDB)
            .once("open", async () => {
                const User = mongoose.model("User");

                // create a bot user for showcasing purposes
                if (!(await User.exists({ username: "XClone" }))) {
                    const adminUser = new User({
                        username: "xclone",
                        displayName: "XClone",
                        email: "czaki.kopia@gmail.com",
                        profileImageURL: `${process.env.API_URL}/uploads/default_pfp.png`,
                        verified: true,
                    });

                    await adminUser.save();

                    const Tweet = mongoose.model("Tweet");
                    const tweet = new Tweet({
                        author: adminUser._id,
                        content: "#Welcome to XClone. This is only a preview of a post, but feel free to dive into the rest of the app! :)"
                    });

                    await tweet.save();
                }

                listener && listener();
            });

        return mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;
