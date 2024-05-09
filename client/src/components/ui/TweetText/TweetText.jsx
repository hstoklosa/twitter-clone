import { Link } from "react-router-dom";

const isHashtag = (text) => /^#[^ !@#$%^&*(),.?":{}|<>]*$/gi.test(text);
const isMention = (text) => /\B@\w+/g.test(text);

const TweetText = ({ text, textRef, highlight = " " }) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
        <div
            className="tweet-text"
            ref={textRef}
        >
            {parts.map((part, idx) => {
                if (isHashtag(part))
                    return (
                        <Link
                            to={`/search?q=${part}`}
                            className="highlighted-text"
                            key={idx}
                        >
                            {part}
                        </Link>
                    );

                if (isMention(part)) {
                    return (
                        <Link
                            to={`/${part}`}
                            className="highlighted-text"
                            key={idx}
                        >
                            {part}
                        </Link>
                    )
                };

                return (
                    <span key={idx}>
                        {part}
                    </span>
                );
            })}
        </div>
    );
};

export default TweetText;
