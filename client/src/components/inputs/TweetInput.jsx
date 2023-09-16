import "react-circular-progressbar/dist/styles.css";
import "../../styles/TweetInput.css";

import { useState, useEffect, useRef } from "react";

import { IconContext } from "react-icons";
import { IoEarth } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbCalendarTime, TbMoodSmile } from "react-icons/tb";
import { MdOutlinePoll, MdOutlineGifBox } from "react-icons/md";
import { PiImageSquareBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { TweetText } from "../index";
import { useCheckAuthQuery } from "../../store/api/authApi";
import { useGetUserInfoQuery, useCreateTweetMutation } from "../../store/api/userApi";

import useOutsideClick from "../../hooks/useOutsideClick";

const TweetInput = ({ maxLength, forceExpand }) => {
    const [tweet, setTweet] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [expanded, setExpanded] = useState(() => (forceExpand ? true : false));

    const {
        data: { info: currentUser },
    } = useCheckAuthQuery();

    const { id, profileImageURL } = useGetUserInfoQuery(currentUser?.username, {
        selectFromResult: ({ data }) => ({
            id: data?._id,
            profileImageURL: data?.profileImageURL,
        }),
    });

    const [createTweet] = useCreateTweetMutation();

    const ref = useOutsideClick(() => closeInput());
    const inputRef = useRef();
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

    const handleFileChange = ({ target }) => {
        const types = ["image/png", "image/jpeg", "image/jpg"];
        const files = target.files;
        const image = files?.[0];

        if (image && types.includes(image.type)) {
            const blob = URL.createObjectURL(image);

            setMedia(image);
            setMediaPreview(blob);
        }
    };

    const handleTweet = async () => {
        const formData = new FormData();

        formData.append("content", tweet);
        formData.append("author", id);
        formData.append("media", media);

        const result = await createTweet(formData).unwrap();

        if (!result.error) {
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
        <div
            className={`tweet-input ${forceExpand && "force-expand"}`}
            ref={ref}
        >
            <div className="pfp-container">
                <img
                    src={profileImageURL}
                    className="pfp"
                    alt="User PFP"
                />
            </div>

            <div className="tweet-form">
                <div className={`tweet-form_container ${expanded && "expanded"}`}>
                    <button
                        type="button"
                        className="audience"
                        disabled
                    >
                        Everyone
                    </button>

                    <div
                        className="tweet-input-wrapper"
                        ref={textInputRef}
                    >
                        <TweetText
                            text={tweet}
                            textRef={textRef}
                            highlight=" "
                        />

                        <textarea
                            type="text"
                            id="tweet"
                            placeholder="What's happening?!"
                            maxLength={maxLength}
                            value={tweet}
                            onChange={({ target }) => setTweet(target.value)}
                            onFocus={() => setExpanded(true)}
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
                </div>

                <div className="tweet-actions">
                    <div className="attachments">
                        <IconContext.Provider value={{ className: "tweet-attachments_icon" }}>
                            <label
                                type="button"
                                className="tweet-attachments_button"
                            >
                                <input
                                    type="file"
                                    id="image"
                                    accept=".jpg, .jpeg, .png"
                                    style={{
                                        display: "none",
                                    }}
                                    onChange={handleFileChange}
                                />
                                <PiImageSquareBold size="16" />
                            </label>

                            <button
                                type="button"
                                className="tweet-attachments_button"
                            >
                                <MdOutlineGifBox size="16" />
                            </button>

                            <button
                                type="button"
                                disabled
                                className="tweet-attachments_button"
                            >
                                <MdOutlinePoll size="16" />
                            </button>

                            <button
                                type="button"
                                disabled
                                className="tweet-attachments_button"
                            >
                                <TbMoodSmile size="16" />
                            </button>

                            <button
                                type="button"
                                disabled
                                className="tweet-attachments_button"
                            >
                                <TbCalendarTime size="16" />
                            </button>

                            <button
                                type="button"
                                disabled
                                className="tweet-attachments_button"
                            >
                                <HiOutlineLocationMarker size="16" />
                            </button>
                        </IconContext.Provider>
                    </div>

                    <div className="tweet-submit">
                        {tweet.length > 0 && (
                            <>
                                <div
                                    className="progressbar-container"
                                    style={{ width: 25, height: 25 }}
                                >
                                    <CircularProgressbar
                                        value={(tweet.length / 280) * 100}
                                        styles={buildStyles({
                                            pathColor:
                                                tweet.length === maxLength ? "red" : "#1D9BF0",
                                            trailColor: "#2F3336",
                                            backgroundColor: "#3e98c7",
                                        })}
                                    />
                                </div>
                                <div className="separator"></div>
                            </>
                        )}

                        <button
                            type="button"
                            className="blue-btn post-btn"
                            disabled={tweet.length <= 0}
                            onClick={handleTweet}
                        >
                            Tweet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TweetInput;
