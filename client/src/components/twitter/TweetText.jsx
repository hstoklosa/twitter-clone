import { Link } from "react-router-dom";

const hashtagRegex = /^#[^ !@#$%^&*(),.?":{}|<>]*$/gi;
const mentionRegex = /\B@\w+/g;

const TweetText = ({ text, textRef, highlight = " " }) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
        <div
            className="tweet-text"
            ref={textRef}
        >
            {parts.map((part, idx) => {
                if (hashtagRegex.test(part)) {
                    return (
                        <Link
                            to={`/hashtag/${part}`}
                            className="highlighted-text"
                            key={idx}
                        >
                            {part}
                        </Link>
                    );
                }

                if (mentionRegex.test(part)) {
                    return (
                        <Link
                            to={`/${part}`}
                            className="highlighted-text"
                            key={idx}
                        >
                            {part}
                        </Link>
                    );
                }

                return <span key={idx}>{part}</span>;
            })}
        </div>
    );
};

export default TweetText;
