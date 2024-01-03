import "../../ui/TweetPreview/styles.css";
import "./styles.css";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
    BaseModal,
    ColumnHeader,
    TweetText,
    TweetInput,
    TweetFormActions,
    TweetDetails,
    QuotePreview,
} from "../../index";

import { useAppSelector } from "../../../app/store";
import { useCreateTweetMutation } from "../../../features/api/tweetApi";

import { isObjEmpty } from "../../../utils/object";

const ReplyModal = ({ replyingTo, isOpen, onClose, maxLength = 280 }) => {
    const [tweet, setTweet] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);

    const inputRef = useRef();

    const {
        user: { id, username, profileImageURL },
    } = useAppSelector((state) => state.auth);

    const [createTweet] = useCreateTweetMutation();

    const isQuote = replyingTo.quoteTo && !isObjEmpty(replyingTo.quoteTo);

    const handleReply = async () => {
        const formData = new FormData();

        formData.append("content", tweet);
        formData.append("author", id);
        formData.append("media", media);
        formData.append("replyTo", replyingTo._id);

        const result = await createTweet(formData).unwrap();

        if (!result?.error) {
            closeInput();

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
            onClose={onClose}
            className="reply-modal"
        >
            <ColumnHeader close={onClose} />

            <section className="recipient-tweet">
                <div className="pfp-container">
                    <img
                        src={replyingTo.author.profileImageURL}
                        className="pfp"
                        alt="User PFP"
                    />
                </div>

                <div className="tweet-container">
                    <TweetDetails tweet={replyingTo} date={false} />

                    <div className="tweet-content">
                        <TweetText text={replyingTo.content} />
                    </div>

                    {isQuote && <QuotePreview tweet={replyingTo.quoteTo} />}

                    <p className="replyingTo">
                        Replying to{" "}
                        <Link
                            to={`/${replyingTo.author.username}`}
                            className="link-blue"
                        >
                            @{replyingTo.author.username}
                        </Link>
                    </p>
                </div>
            </section>

            <section className="tweet-input">
                <div className="pfp-container">
                    <img
                        src={profileImageURL}
                        className="pfp"
                        alt="User PFP"
                    />
                </div>
                <div className="input-container">
                    <TweetInput
                        tweet={tweet}
                        setTweet={setTweet}
                        maxLength={maxLength}
                        inputRef={inputRef}
                        mediaPreview={mediaPreview}
                        clearMedia={clearMedia}
                        placeholder="Tweet your reply"
                    />
                </div>
            </section>

            <TweetFormActions
                tweet={tweet}
                setMedia={setMedia}
                setMediaPreview={setMediaPreview}
                handleTweet={handleReply}
                maxLength={maxLength}
                buttonValue="Reply"
            />
        </BaseModal>
    );
};

export default ReplyModal;
