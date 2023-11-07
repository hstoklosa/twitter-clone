import "../../styles/TweetDetails.css";

import { Link } from "react-router-dom";
import { getTimeDifference } from "../../helpers/date";

const TweetDetails = ({ tweet, children }) => {
    return (
        <div className="tweet-details">
            <Link
                to={`/${tweet.author.username}`}
                className="display_name"
            >
                {tweet.author.displayName}
            </Link>

            <p className="username">@{tweet.author.username}</p>
            <span className="separator">·</span>
            <p className="date">{getTimeDifference(tweet.createdAt)}</p>

            {children}
        </div>
    );
};

export default TweetDetails;
