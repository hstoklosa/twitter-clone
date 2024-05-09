import "./styles.css";
import "../../ui/TweetForm/styles.css";

import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import { IoEarth } from "react-icons/io5";

import { useAppSelector } from "../../../app/store";
import { useCreateTweetMutation } from "../../../features/api/tweetApi";

import {
    ColumnHeader,
    BaseModal,
    TweetFormActions,
    TweetInput,
    QuotePreview,
    PfpContainer
} from "../../index";


const stateSelector = createSelector(
    (state) => state.modal,
    (state) => state.auth,
    (modal, auth) => ({
        currentUser: auth.user,
    })
);

const TweetModal = ({ maxLength = 280, placeholder, quote = null, isOpen, closeModal = () => { } }) => {
    const [tweet, setTweet] = useState("");
    const [media, setMedia] = useState();
    const [mediaPreview, setMediaPreview] = useState();

    const inputRef = useRef();

    const { currentUser: { id, profileImageURL, username } } = useAppSelector(stateSelector);
    const [createTweet] = useCreateTweetMutation();

    const handleTweet = async () => {
        const formData = new FormData();

        formData.append("content", tweet);
        formData.append("author", id);
        formData.append("media", media);

        !!quote?._id && formData.append("quoteTo", quote._id);

        const result = await createTweet(formData).unwrap();

        if (!result.error) {
            toast.success(() => (
                <span>
                    <span>Your Tweet was sent  </span>
                    <Link
                        to={`/${username}/status/${result.tweetId}`}
                        className="toast-view-link"
                    >
                        View
                    </Link>
                </span>
            ), { duration: 6000 });

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

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={closeModal}
            className="tweet-modal"
        >
            <ColumnHeader closeModal={true} />

            <section className="tweet-input">
                <div className="tweet-input_container">
                    <PfpContainer src={profileImageURL} />

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
                            placeholder={placeholder}
                        />

                        {quote && <QuotePreview tweet={quote} />}
                    </div>
                </div>

                <button
                    type="button"
                    className="reply_label"
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
