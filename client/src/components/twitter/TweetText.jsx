import { Link } from "react-router-dom";

const hashtag = /^#[^ !@#$%^&*(),.?":{}|<>]*$/gi;
const mention = /\B@\w+/g;

const TweetText = ({ text, textRef, highlight = " " }) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    const isHashtag = (text) => {
        return hashtag.test(text);
    };

    const isMention = (text) => {
        return mention.test(text);
    };

    return (
        <div
            className="tweet-text"
            ref={textRef}
        >
            {parts.map((part, idx) => {
                if (isHashtag(part))
                    <Link
                        className="highlighted-text"
                        to={`/hashtag/${part}`}
                        key={idx}
                    >
                        {part}
                    </Link>;

                if (isMention(part))
                    <Link
                        className="highlighted-text"
                        to={`/${part}`}
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
