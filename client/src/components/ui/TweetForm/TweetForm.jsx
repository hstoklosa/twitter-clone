import "./styles.css";

import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { IoEarth } from "react-icons/io5";

import { useAppSelector } from "../../../app/store";
import { useCreateTweetMutation } from "../../../features/api/tweetApi";
import useOutsideClick from "../../../hooks/useOutsideClick";

import { TweetInput, TweetFormActions, PfpContainer } from "../../index";


const TweetForm = ({
    replyTo,
    forceExpand,
    buttonValue,
    placeholder,
    maxLength = 280,
    showPfp = true,
}) => {
    const [tweet, setTweet] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [expanded, setExpanded] = useState(forceExpand);

    const ref = useOutsideClick(() => closeInput());
    const inputRef = useRef();

    const {
        user: { id, username, profileImageURL },
    } = useAppSelector((state) => state.auth);

    const [createTweet] = useCreateTweetMutation();

    const handleTweet = async () => {
        const formData = new FormData();

        formData.append("content", tweet);
        formData.append("author", id);
        formData.append("media", media);

        if (replyTo) formData.append("replyTo", replyTo);

        const result = await createTweet(formData).unwrap();

        if (result.error) {
            toast.error("Error creating tweet!")
        }

        if (!result.error && result?.tweetId) {
            toast.success(
                () => (
                    <span>
                        <span>Your Tweet was sent  </span>
                        <Link
                            to={`/${username}/status/${result.tweetId}`}
                            className="toast-view-link"
                        >
                            View
                        </Link>
                    </span >
                ),
                { duration: 6000 }
            );

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
            {showPfp && <PfpContainer src={profileImageURL} />}

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
                        placeholder={placeholder}
                        inputRef={inputRef}
                        maxLength={maxLength}
                        tweet={tweet}
                        setTweet={setTweet}
                        onFocus={() => setExpanded(true)}
                    />

                    {mediaPreview && (
                        <div className="media-preview">
                            <button
                                className="dark_round-btn media-preview_close"
                                onClick={clearMedia}
                            >
                                <div className="icon-container">
                                    <IoMdClose
                                        size="20"
                                        className="icon"
                                    />
                                </div>
                            </button>

                            <img src={mediaPreview} alt="Media Preview" />
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
                    tweet={tweet}
                    setMedia={setMedia}
                    setMediaPreview={setMediaPreview}
                    handleTweet={handleTweet}
                    buttonValue={buttonValue}
                />
            </div>
        </section>
    );
};

export default TweetForm;
