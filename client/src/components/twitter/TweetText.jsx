import { Link } from "react-router-dom";
import verifyWithRegex, { HASHTAG_REGEX, MENTION_REGEX } from "../../helpers/validateRegex";

const TweetText = ({ text, highlight, textRef }) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
        <div
            className="tweet-text"
            ref={textRef}
        >
            {parts.map((part, idx) => {
                if (verifyWithRegex(HASHTAG_REGEX, part))
                    <Link
                        to={`/hashtag/${part}`}
                        className="highlighted-text"
                        key={idx}
                    >
                        {part}
                    </Link>;

                if (verifyWithRegex(MENTION_REGEX, part))
                    <Link
                        to={`/${part}`}
                        className="highlighted-text"
                        key={idx}
                    >
                        {part}
                    </Link>;

                return <span key={idx}>{part}</span>;
            })}
        </div>
    );
};

export default TweetText;
