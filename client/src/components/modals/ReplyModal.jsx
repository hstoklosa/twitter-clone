import "../../styles/Tweet.css";
import "../../styles/ReplyModal.css";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
    BaseModal,
    ColumnHeader,
    TweetText,
    TweetInput,
    TweetActions,
    TweetDetails,
    QuotePreview,
} from "../index";
import { useCheckAuthQuery } from "../../store/api/authApi";
import { useGetUserInfoQuery } from "../../store/api/userApi";
import { useCreateTweetMutation } from "../../store/api/tweetApi";

import { isObjEmpty } from "../../utils/object";

const ReplyModal = ({ replyingTo, isOpen, onClose, maxLength = 280 }) => {
    const [tweet, setTweet] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);

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
                    <TweetDetails tweet={replyingTo} />

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
                    />
                </div>
            </section>

            <TweetActions
                tweet={tweet}
                setMedia={setMedia}
                setMediaPreview={setMediaPreview}
                handleTweet={handleReply}
                maxLength={maxLength}
            />
        </BaseModal>
    );
};

export default ReplyModal;