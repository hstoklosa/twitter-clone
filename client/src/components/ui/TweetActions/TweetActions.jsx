import "./styles.css";

import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { PiPencilSimpleLine } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { TbMessageCircle2, TbShare2 } from "react-icons/tb";
import { IoMdStats } from "react-icons/io";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";

import { LinkButton, FloatOptions } from "../../index"

import {
    useLikeTweetMutation,
    useUnlikeTweetMutation,
    useCreateRepostMutation,
    useDeleteRepostMutation,
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation,
} from "../../../features/api/userApi";

const TweetActions = ({ tweet, currentUser, openReplyModal, openQuoteModal }) => {
    const [retweetFloat, setRetweetFloat] = useState(false);

    const [createRepost] = useCreateRepostMutation();
    const [deleteRepost] = useDeleteRepostMutation();
    const [likeTweet] = useLikeTweetMutation();
    const [unlikeTweet] = useUnlikeTweetMutation();
    const [createBookmark] = useCreateBookmarkMutation();
    const [deleteBookmark] = useDeleteBookmarkMutation();

    const isBookmarked = currentUser.bookmarks.includes(tweet._id);
    const isReposted = tweet.retweets.includes(currentUser._id);
    const isLiked = tweet.likes.includes(currentUser._id);

    const handleRetweet = async (e) => {
        const retweetResult = isReposted
            ? await deleteRepost({ tweetId: tweet._id })
            : await createRepost({ tweetId: tweet._id });

        if (retweetResult?.error) return;

        if (
            (isReposted && !retweetResult.data?.isReposted) ||
            (!isReposted && retweetResult.data?.isReposted)
        )
            closeRetweetFloat();
    };

    const handleLike = async (e) => {
        isLiked
            ? await unlikeTweet({ id: tweet._id })
            : await likeTweet({ id: tweet._id });
    };

    const handleBookmark = async () => {
        const bookmarkData = {
            tweetId: tweet._id,
            userId: currentUser.id,
        };

        isBookmarked
            ? await deleteBookmark(bookmarkData)
            : await createBookmark(bookmarkData);
    };


    const openRetweetFloat = () => setRetweetFloat(true);
    const closeRetweetFloat = () => setRetweetFloat(false);

    return (
        <div className="tweet-actions">
            <LinkButton
                className={`action-btn reply blue_round-btn`}
                onClick={openReplyModal}
            >
                <div className="icon-container">
                    <TbMessageCircle2 className="icon" />
                </div>

                <div className="count-container">
                    <span>{tweet.repliesCount}</span>
                </div>
            </LinkButton>

            <LinkButton
                className={`action-btn retweet green_round-btn ${isReposted && "applied"}`}
                onClick={openRetweetFloat}
            >
                <div className="icon-container">
                    <LuRepeat2 className="icon" />
                </div>

                <div className="count-container">
                    <span>{tweet.retweets.length}</span>
                </div>

                {retweetFloat && (
                    <IconContext.Provider
                        value={{ className: "float-icon" }}
                    >
                        <FloatOptions
                            isOpen={retweetFloat}
                            onClose={closeRetweetFloat}
                            className="retweet-options"
                        >
                            <LinkButton
                                type="button"
                                className="float-btn"
                                onClick={handleRetweet}
                            >
                                <div className="float-icon-container">
                                    <LuRepeat2 />
                                </div>

                                {isReposted ? "Undo Repost" : "Repost"}
                            </LinkButton>

                            <LinkButton
                                type="button"
                                className="float-btn"
                                onClick={openQuoteModal}
                            >
                                <div className="float-icon-container">
                                    <PiPencilSimpleLine size="21" />
                                </div>
                                Quote
                            </LinkButton>
                        </FloatOptions>
                    </IconContext.Provider>
                )}
            </LinkButton>

            <LinkButton
                type="button"
                className={`action-btn like red_round-btn ${isLiked && "applied"}`}
                data-type="inner-button"
                onClick={handleLike}
            >
                <div className="icon-container">
                    {isLiked ? <AiFillHeart className="icon" /> : <AiOutlineHeart className="icon" />}
                </div>

                <div className="count-container">
                    <span>{tweet.likes.length}</span>
                </div>
            </LinkButton>

            <LinkButton
                className="action-btn view blue_round-btn"
                disabled
            >
                <div className="icon-container">
                    <IoMdStats className="icon" />
                </div>

                <div className="count-container">
                    <span>0</span>
                </div>
            </LinkButton>

            <div className="tweet-actions-container">
                <LinkButton
                    type="button"
                    className="action-btn bookmark blue_round-btn"
                    onClick={handleBookmark}
                >
                    <div className="icon-container">
                        {isBookmarked ? (
                            <BiSolidBookmark className="icon" />
                        ) : (
                            <BiBookmark className="icon" />
                        )}
                    </div>
                </LinkButton>

                <LinkButton
                    className="action-btn tweet-btn blue_round-btn"
                    disabled
                >
                    <div className="icon-container">
                        <TbShare2 className="icon" />
                    </div>
                </LinkButton>
            </div>
        </div>
    )
}

export default TweetActions;