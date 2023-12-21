import "./styles.css";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { IoEarth } from "react-icons/io5";

import useOutsideClick from "../../../hooks/useOutsideClick";

import { TweetInput, TweetFormActions } from "../../index";

import { useAppSelector } from "../../../app/store";
import { useCreateTweetMutation } from "../../../features/api/tweetApi";

const TweetForm = ({
    replyTo,
    forceExpand,
    maxLength = 280,
    buttonText = "Tweet",
    placeholder = "What's happening?",
}) => {
    const [tweet, setTweet] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [expanded, setExpanded] = useState(forceExpand);

    const ref = useOutsideClick(() => closeInput());
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
        replyTo && formData.append("replyTo", replyTo);

        const result = await createTweet(formData).unwrap();

        if (result.error) {
            toast.error("Error creating tweet")
        }

        if (!result.error) {
            toast.success("Tweet created!")
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
                    {!replyTo && (
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

                    {!replyTo && (
                        <button
                            type="button"
                            className="reply_label"
                            disabled
                        >
                            <IconContext.Provider
                                value={{ className: "reply_icon" }}
                            >
                                <IoEarth size="16" />
                            </IconContext.Provider>

                            <span className="reply-option">Everyone can reply</span>
                        </button>
                    )}
                </div>

                <TweetFormActions
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
