import "./styles.css";

import { Link, useLocation } from "react-router-dom";
import { PfpContainer } from "../../index";
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
            className="quote-preview flex-truncate_parent"
        >
            <div className="details-wrapper flex-truncate_parent">
                <PfpContainer src={tweet.author.profileImageURL} />

                <Link
                    className="display_name flex-truncate_child"
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
