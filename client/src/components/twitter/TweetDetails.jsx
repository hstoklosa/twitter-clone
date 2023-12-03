import "../../styles/TweetDetails.css";

import { Link } from "react-router-dom";
import { getTimeDifference } from "../../helpers/date";

const TweetDetails = ({ tweet, children }) => {
    const timeDifference = getTimeDifference(tweet.createdAt);

    return (
        <div className="tweet-details">
            <Link
                className="display_name"
                to={`/${tweet.author.username}`}
            >
                {tweet.author.displayName}
            </Link>

            <p className="username">@{tweet.author.username}</p>
            <span className="separator">·</span>
            <p className="date">{timeDifference}</p>

            {children}
        </div>
    );
};

export default TweetDetails;
