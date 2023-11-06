import "../../styles/TweetInput.css";

import { useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { TweetText } from "../index";

const TweetInput = ({
    inputRef,
    maxLength,
    tweet,
    setTweet,
    setExpanded,
    mediaPreview,
    clearMedia,
}) => {
    const textInputRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if (!textRef.current) return;

        // reset height for text clearing
        textInputRef.current.style.height = "auto";
        textRef.current.style.height = "auto";

        // set the new height based on scrollHeight
        textInputRef.current.style.height = `${textRef.current.scrollHeight || 32}px`;
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }, [tweet]);

    return (
        <>
            <div
                className="tweet-input-wrapper"
                ref={textInputRef}
            >
                <TweetText
                    text={tweet}
                    textRef={textRef}
                />

                <textarea
                    type="text"
                    id="tweet"
                    placeholder="What's happening?!"
                    maxLength={maxLength}
                    value={tweet}
                    onChange={({ target }) => setTweet(target.value)}
                    onFocus={() => setExpanded && setExpanded(true)}
                    ref={inputRef}
                />
            </div>

            {mediaPreview && (
                <div className="media-preview">
                    <button
                        className="dark-round-btn"
                        onClick={clearMedia}
                    >
                        <IconContext.Provider value={{ className: "close_icon" }}>
                            <IoMdClose size="20" />
                        </IconContext.Provider>
                    </button>
                    <img
                        src={mediaPreview}
                        alt="Media Preview"
                    />
                </div>
            )}
        </>
    );
};

export default TweetInput;
