import "./styles.css";
import "../../ui/TweetForm/styles.css";

import { useState, useRef } from "react";

import { IconContext } from "react-icons";
import { IoEarth } from "react-icons/io5";

import { useAppSelector } from "../../../app/store";

import {
    ColumnHeader,
    BaseModal,
    TweetFormActions,
    TweetInput,
    QuotePreview,
} from "../../index";

import { useCreateTweetMutation } from "../../../features/api/tweetApi";

const TweetModal = ({ maxLength = 280, quote = null, isOpen, onClose }) => {
    const [tweet, setTweet] = useState("");
    const [media, setMedia] = useState();
    const [mediaPreview, setMediaPreview] = useState();

    const inputRef = useRef();

    const {
        user: { id, profileImageURL },
    } = useAppSelector((state) => state.auth);

    const [createTweet] = useCreateTweetMutation();

    const handleTweet = async () => {
        const formData = new FormData();

        formData.append("content", tweet);
        formData.append("author", id);
        formData.append("media", media);
        !!quote?._id && formData.append("quoteTo", quote._id);

        const result = await createTweet(formData).unwrap();

        if (!result.error) {
            closeInput();
        }
    };

    const closeInput = () => {
        clearMedia();
        setTweet("");
        inputRef.current.blur();
    };

    const clearMedia = () => {
        setMedia(null);
        setMediaPreview(null);
    };

    console.log(quote);

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            className="tweet-modal"
        >
            <ColumnHeader close={onClose} />

            <section className="tweet-input">
                <div className="tweet-input_container">
                    <div className="pfp-container">
                        <img
                            src={profileImageURL}
                            className="pfp"
                            alt="User PFP"
                        />
                    </div>

                    <div className="input-wrap">
                        <button
                            type="button"
                            className="audience"
                            disabled
                        >
                            Everyone
                        </button>

                        <TweetInput
                            tweet={tweet}
                            setTweet={setTweet}
                            maxLength={maxLength}
                            inputRef={inputRef}
                            mediaPreview={mediaPreview}
                            clearMedia={clearMedia}
                        />

                        {quote && <QuotePreview tweet={quote} />}
                    </div>
                </div>

                <button
                    type="button"
                    className="reply"
                    disabled
                >
                    <IconContext.Provider value={{ className: "reply_icon" }}>
                        <IoEarth size="16" />
                    </IconContext.Provider>

                    <span className="reply-option">Everyone can reply</span>
                </button>

                <TweetFormActions
                    tweet={tweet}
                    setMedia={setMedia}
                    setMediaPreview={setMediaPreview}
                    handleTweet={handleTweet}
                    maxLength={maxLength}
                />
            </section>
        </BaseModal>
    );
};

export default TweetModal;
