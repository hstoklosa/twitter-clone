import "../../styles/QuotePreview.css";

import { Link } from "react-router-dom";

import { TweetDetails } from "../index";
import { isObjEmpty } from "../../utils/object";

const QuotePreview = ({ tweet }) => {
    const isReply = tweet.replyTo && !isObjEmpty(tweet.replyTo);
    const media = tweet.media?.[0];

    console.log(tweet);

    return (
        <Link
            to={`/${tweet.author.username}/status/${tweet._id}`}
            className="quote-preview"
        >
            <div className="details-wrapper">
                <div className="pfp-container">
                    <img
                        src={tweet.author.profileImageURL}
                        className="pfp"
                        alt="User Pfp"
                    />
                </div>

                <TweetDetails tweet={tweet} />
            </div>

            <div className="tweet-content">
                <div className="content-wrap">
                    {isReply && (
                        <span className="replyingTo">
                            Replying to @{tweet.replyTo.author.username}
                        </span>
                    )}

                    <span>{tweet.content}</span>
                </div>

                {media && (
                    <div className="media-container">
                        <img
                            src={media.url}
                            className="tweet_media"
                            alt="Tweet Media"
                        />
                    </div>
                )}
            </div>
        </Link>
    );
};

export default QuotePreview;
