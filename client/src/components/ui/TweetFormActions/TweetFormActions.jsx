import "react-circular-progressbar/dist/styles.css";
import "./styles.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { IconContext } from "react-icons";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbCalendarTime, TbMoodSmile } from "react-icons/tb";
import { MdOutlinePoll, MdOutlineGifBox } from "react-icons/md";
import { PiImageSquareBold } from "react-icons/pi";

const TweetFormActions = ({ maxLength, tweet, handleTweet, setMedia, setMediaPreview }) => {
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

    return (
        <div className="tweet-actions">
            <div className="attachments">
                <IconContext.Provider value={{ className: "icon tweet-attachments_icon" }}>
                    <label
                        type="button"
                        className="tweet-attachments_button blue_round-btn"
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
                        <div className="icon-container">
                            <PiImageSquareBold size="16" />
                        </div>
                    </label>

                    <button
                        type="button"
                        className="tweet-attachments_button blue_round-btn"
                        disabled
                    >
                        <div className="icon-container">
                            <MdOutlineGifBox size="16" />
                        </div>
                    </button>

                    <button
                        type="button"
                        className="tweet-attachments_button blue_round-btn"
                        disabled
                    >
                        <div className="icon-container">
                            <MdOutlinePoll size="16" />
                        </div>
                    </button>

                    <button
                        type="button"
                        className="tweet-attachments_button blue_round-btn"
                        disabled
                    >
                        <div className="icon-container">
                            <TbMoodSmile size="16" />
                        </div>
                    </button>

                    <button
                        type="button"
                        className="tweet-attachments_button blue_round-btn"
                        disabled
                    >
                        <div className="icon-container">
                            <TbCalendarTime size="16" />
                        </div>
                    </button>

                    <button
                        type="button"
                        className="tweet-attachments_button blue_round-btn"
                        disabled
                    >
                        <div className="icon-container">
                            <HiOutlineLocationMarker size="16" />
                        </div>
                    </button>
                </IconContext.Provider>
            </div>

            <div className="tweet-submit">
                {tweet.length > 0 && (
                    <div
                        className="progressbar-container"
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    >
                        <CircularProgressbar
                            value={(tweet.length / 280) * 100}
                            styles={buildStyles({
                                pathColor: tweet.length === maxLength ? "red" : "#1D9BF0",
                                trailColor: "#2F3336",
                                backgroundColor: "#3e98c7",
                            })}
                        />
                    </div>
                )}

                {tweet.length > 0 && <div className="separator"></div>}

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
    );
};

export default TweetFormActions;
