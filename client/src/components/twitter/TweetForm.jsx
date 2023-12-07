import "../../styles/TweetForm.css";

import { useState, useRef } from "react";

import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { IoEarth } from "react-icons/io5";

import useOutsideClick from "../../hooks/useOutsideClick";

import { TweetInput, TweetActions } from "../index";
import { useCheckAuthQuery } from "../../store/api/authApi";
import { useGetUserInfoQuery } from "../../store/api/userApi";
import { useCreateTweetMutation } from "../../store/api/tweetApi";

const TweetForm = ({ isReply, button, placeholder, forceExpand, maxLength = 280 }) => {
    const [tweet, setTweet] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [expanded, setExpanded] = useState(forceExpand);

    const ref = useOutsideClick(() => closeInput());
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

        const result = await createTweet(formData).unwrap();

        if (!result?.error) {
            closeInput();
        }
    };

    const closeInput = () => {
        clearMedia();
        setTweet("");
        inputRef.current.blur();
        !forceExpand && setExpanded(false);
    };

    const clearMedia = () => {
        setMedia(null);
        setMediaPreview(null);
    };

    return (
        <section
            className={`tweet-form ${forceExpand && "force-expand"}`}
            ref={ref}
        >
            <div className="pfp-container">
                <img
                    src={profileImageURL}
                    className="pfp"
                    alt="User PFP"
                />
            </div>

            <div className="tweet-input">
                <div className={`tweet-input_container ${expanded && "expanded"}`}>
                    {!isReply && (
                        <button
                            type="button"
                            className="audience"
                            disabled
                        >
                            Everyone
                        </button>
                    )}

                    <TweetInput
                        inputRef={inputRef}
                        maxLength={maxLength}
                        tweet={tweet}
                        setTweet={setTweet}
                        setExpanded={setExpanded}
                    />

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

                    {!isReply && (
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
                    )}
                </div>

                <TweetActions
                    maxLength={maxLength}
                    tweet={tweet}
                    setMedia={setMedia}
                    setMediaPreview={setMediaPreview}
                    handleTweet={handleTweet}
                />
            </div>
        </section>
    );
};

export default TweetForm;
