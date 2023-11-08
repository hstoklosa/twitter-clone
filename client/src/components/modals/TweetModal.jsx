import "../../styles/TweetModal.css";
import "../../styles/TweetForm.css";

import { useState, useRef } from "react";

import { IconContext } from "react-icons";
import { IoEarth } from "react-icons/io5";

import { ColumnHeader, BaseModal, TweetActions, TweetInput, QuotePreview } from "../index";
import { useCheckAuthQuery } from "../../store/api/authApi";
import { useGetUserInfoQuery } from "../../store/api/userApi";
import { useCreateTweetMutation } from "../../store/api/tweetApi";

const TweetModal = ({ maxLength = 280, quote = null, isOpen, onClose }) => {
    const [tweet, setTweet] = useState("");
    const [media, setMedia] = useState();
    const [mediaPreview, setMediaPreview] = useState();

    const inputRef = useRef();

    const {
        data: { data: currentUser },
    } = useCheckAuthQuery();

    const { id, profileImageURL } = useGetUserInfoQuery(currentUser?.username, {
        selectFromResult: ({ data }) => ({
            id: data?._id,
            profileImageURL: data?.profileImageURL,
        }),
    });

    const [createTweet] = useCreateTweetMutation();

    const handleTweet = async () => {
        const formData = new FormData();

        formData.append("content", tweet);
        formData.append("author", id);
        formData.append("media", media);
        formData.append("retweetId", quote?._id || null);

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

                <TweetActions
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
