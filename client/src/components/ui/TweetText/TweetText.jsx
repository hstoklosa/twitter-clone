import { Link } from "react-router-dom";

const isHashtag = (text) => {
    return /^#[^ !@#$%^&*(),.?":{}|<>]*$/gi.test(text);
};

const isMention = (text) => {
    return /\B@\w+/g.test(text);
};

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
                            key={idx}
                            to={`/search?q=${part}`}
                            className="highlighted-text"
                        >
                            {part}
                        </Link>
                    );

                if (isMention(part)) {
                    return (
                        <Link
                            key={idx}
                            to={`/${part}`}
                            className="highlighted-text"
                        >
                            {part}
                        </Link>
                    )
                };

                return <span key={idx}>{part}</span>;
            })}
        </div>
    );
};

export default TweetText;
