import "../../styles/Feed.css";

import { Tweet, Spinner } from "../index";

const Feed = ({ tweets = [], isTweetsLoading, lastElementRef, EmptyFeedComponent }) => {
    return (
        <section id="feed">
            {isTweetsLoading ? (
                <div
                    className="spinner-wrapper"
                    style={{
                        width: "100%",
                        height: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Spinner />
                </div>
            ) : tweets.length > 0 ? (
                tweets.map((tweet, idx) => (
                    <Tweet
                        key={idx}
                        tweet={tweet}
                        lastElementRef={lastElementRef}
                    />
                ))
            ) : (
                EmptyFeedComponent
            )}
        </section>
    );
};

export default Feed;
