import "./styles.css";

import { Link, useLocation } from "react-router-dom";
import { isObjEmpty } from "../../../utils/object";
import { getTimeDifference } from "../../../helpers/date";

const QuotePreview = ({ tweet }) => {
    const { pathname } = useLocation();


    const isReply = tweet.replyTo && !isObjEmpty(tweet.replyTo);
    const formattedDate = getTimeDifference(tweet.createdAt);
    const media = tweet.media?.[0];

    return (
        <Link
            to={`/${tweet.author.username}/status/${tweet._id}`}
            state={{ previousPath: pathname }}
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

                <Link
                    className="display_name"
                    to={`/${tweet.author.username}`}
                >
                    {tweet.author.displayName}
                </Link>

                <p className="username">@{tweet.author.username}</p>

                <p className="date">
                    <span className="separator">·</span>
                    {formattedDate}
                </p>
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
                    <div className="media-container quote-media">
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
