import "./styles.css";

import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

import { TweetText } from "../../index";

const TweetInput = ({
    tweet,
    setTweet,
    mediaPreview,
    clearMedia,
    maxLength,
    inputRef,
    onFocus,
    placeholder = "What's happening?",
}) => {
    const textInputRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if (!textRef.current) return;

        // reset height for text clearing
        textInputRef.current.style.height = "auto";
        textRef.current.style.height = "auto";

        // set the new height based on scrollHeight
        textInputRef.current.style.height = `${textRef.current.scrollHeight || 24}px`;
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }, [tweet]);

    const handleFocus = (e) => {
        onFocus && onFocus(e);
    }

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
                    placeholder={placeholder}
                    ref={inputRef}
                    maxLength={maxLength}
                    value={tweet}
                    onChange={({ target }) => setTweet(target.value)}
                    onFocus={handleFocus}
                />
            </div>

            {mediaPreview && (
                <div className="media-preview">
                    <button
                        className="media-preview_close dark_round-btn"
                        onClick={clearMedia}
                    >
                        <div className="icon-container">
                            <IoMdClose
                                size="20"
                                className="icon"
                            />
                        </div>
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
