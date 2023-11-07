import { Link } from "react-router-dom";

const hashtag = /^#[^ !@#$%^&*(),.?":{}|<>]*$/gi;
const mention = /\B@\w+/g;

const TweetText = ({ text, textRef, highlight = " " }) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
        <div
            className="tweet-text"
            ref={textRef}
        >
            {parts.map((part, idx) => {
                if (hashtag.test(part))
                    <Link
                        key={idx}
                        to={`/hashtag/${part}`}
                        className="highlighted-text"
                    >
                        {part}
                    </Link>;

                if (mention.test(part))
                    <Link
                        key={idx}
                        to={`/${part}`}
                        className="highlighted-text"
                    >
                        {part}
                    </Link>;

                return <span key={idx}>{part}</span>;
            })}
        </div>
    );
};

export default TweetText;
