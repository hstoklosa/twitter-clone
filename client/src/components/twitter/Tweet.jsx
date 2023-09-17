import "../../styles/Tweet.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { FaRegComment, FaComment } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { IoMdStats } from "react-icons/io";
import { TbShare2 } from "react-icons/tb";
import { IoEllipsisHorizontal } from "react-icons/io5";

import { TweetText } from "../index";
import { useCheckAuthQuery } from "../../store/api/authApi";
import { useLikeTweetMutation } from "../../store/api/userApi";
import { getTimeDifference } from "../../helpers/date";

const Tweet = ({ tweet }) => {
    const {
        data: {
            isAuthenticated,
            info: { id },
        },
    } = useCheckAuthQuery();

    const [likeTweet] = useLikeTweetMutation();

    const [liked, setLiked] = useState(tweet.likes.includes(id));
    const [retweeted, setRetweeted] = useState(tweet.retweets.includes(id));
    const [replied, setReplied] = useState(tweet.replies.includes(id));

    const handleLinkClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
        }
    };

    const handleLike = async (e, id) => {
        e.preventDefault();
        await likeTweet({ id }).unwrap();
    };

    const handleReply = (e) => {
        e.preventDefault();
    };

    const handleRetweet = (e) => {
        e.preventDefault();
    };

    const handleShare = (e) => {
        e.preventDefault();
    };

    const handleMore = (e) => {
        e.preventDefault();
    };

    return (
        <IconContext.Provider value={{ className: "tweet_icon" }}>
            <Link
                className="tweet"
                to={`/${tweet.author.username}/status/${tweet._id}`}
                onClick={handleLinkClick}
            >
                <div className="img-container">
                    <Link
                        to={`/${tweet.author.username}`}
                        className="pfp-container"
                        onClick={handleLinkClick}
                    >
                        <img
                            src={tweet.author.profileImageURL}
                            className="pfp"
                            alt="User PFP"
                        />
                    </Link>
                </div>

                <div className="tweet-container">
                    <div className="tweet-info">
                        <Link
                            to={`/${tweet.author.username}`}
                            className="display_name"
                            onClick={handleLinkClick}
                        >
                            {tweet.author.displayName}
                        </Link>

                        <p className="username">@{tweet.author.username}</p>
                        <span className="separator">·</span>
                        <p className="date">{getTimeDifference(tweet.createdAt)}</p>

                        <button
                            className="tweet-btn more"
                            disabled={!isAuthenticated}
                            onClick={handleMore}
                        >
                            <div className="icon-container">
                                <IoEllipsisHorizontal size="16" />
                            </div>
                        </button>
                    </div>

                    <div className="tweet-content">
                        <TweetText
                            text={tweet.content}
                            highlight=" "
                        />

                        {tweet.media?.[0] && (
                            <div className="media-container">
                                <img
                                    src={tweet.media[0].url}
                                    className="tweet_media"
                                    alt="Tweet Media"
                                />
                            </div>
                        )}
                    </div>

                    <div className="tweet-actions">
                        <button
                            className={`tweet-btn comment ${replied && "applied"}`}
                            disabled={!isAuthenticated}
                            onClick={handleReply}
                        >
                            <div className="icon-container">
                                {replied ? <FaComment size="15.5" /> : <FaRegComment size="15.5" />}
                            </div>
                            <p>{tweet.replies.length}</p>
                        </button>

                        <button
                            className={`tweet-btn retweet ${retweeted && "applied"}`}
                            disabled={!isAuthenticated}
                            onClick={handleRetweet}
                        >
                            <div className="icon-container">
                                <BiRepost size="21" />
                            </div>
                            <p>{tweet.retweets.length}</p>
                        </button>

                        <button
                            type="button"
                            className={`tweet-btn like ${liked && "applied"}`}
                            disabled={!isAuthenticated}
                            onClick={(e) => handleLike(e, tweet._id)}
                        >
                            <div className="icon-container like-animation">
                                {liked ? <AiFillHeart size="17" /> : <AiOutlineHeart size="17" />}
                            </div>
                            <p>{tweet.likes.length}</p>
                        </button>

                        <button
                            className="tweet-btn view"
                            disabled={!isAuthenticated}
                            onClick={handleShare}
                        >
                            <div className="icon-container">
                                <IoMdStats size="18" />
                            </div>
                            <p>0</p>
                        </button>

                        <button
                            className="tweet-btn share"
                            disabled={!isAuthenticated}
                            onClick={handleShare}
                        >
                            <div className="icon-container">
                                <TbShare2 size="19" />
                            </div>
                        </button>
                    </div>
                </div>
            </Link>
        </IconContext.Provider>
    );
};

export default Tweet;
