import "../../styles/Feed.css";
import Tweet from "./Tweet";

const dummyTweet = {
    _id: "123456789",
    content: "42+10",
    createdAt: "Jun 28",
    author: {
        displayName: "Elon Musk",
        username: "elonmusk",
    },
    replies: [""],
    retweets: [""],
    likes: ["64aadf20e66c076cab2c939d"],
    views: [""],
};

const Feed = ({ tweets }) => {
    return (
        <section id="feed">
            {[...Array(10)].map((_, idx) => (
                <Tweet key={idx} tweet={dummyTweet} />
            ))}
        </section>
    );
};

export default Feed;
