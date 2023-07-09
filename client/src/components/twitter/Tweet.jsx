import userImage from "../../assets/elon.jpg";
import "../../styles/Tweet.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { IconContext } from "react-icons";
import { FaRegComment, FaComment } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { IoMdStats } from "react-icons/io";
import { TbShare2 } from "react-icons/tb";
import { IoEllipsisHorizontal } from "react-icons/io5";

const Tweet = ({ tweet }) => {
    const user = useSelector((state) => state.auth.user);

    const [replied, setReplied] = useState(false);
    const [retweeted, setRetweeted] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user) {
            if (tweet.likes.includes(user._id)) setLiked(true);
            if (tweet.replies.includes(user._id)) setReplied(true);
            if (tweet.retweets.includes(user._id)) setRetweeted(true);
        }
    }, [tweet, user]);

    const handleLinkClick = (e) => {
        if (!user) {
            e.preventDefault();
        }
    };

    const handleReply = (e) => {
        e.preventDefault();
    };

    const handleRetweet = (e) => {
        e.preventDefault();
    };

    const handleLike = (e) => {
        e.preventDefault();
    };

    const handleShare = (e) => {
        e.preventDefault();
    };

    const handleMore = (e) => {
        e.preventDefault();
    };

    return (
        <Link to={`/${tweet.author.username}/${tweet._id}`} className="tweet" onClick={handleLinkClick}>
            <div className="img-container">
                <Link to={`/${tweet.author.username}`} onClick={handleLinkClick}>
                    <img src={userImage} alt="User PFP" />
                </Link>
            </div>
            <div className="tweet-container">
                <div className="tweet-info">
                    <Link to={`/${tweet.author.username}`} className="display_name" onClick={handleLinkClick}>
                        {tweet.author.displayName}
                    </Link>

                    <p className="username">@{tweet.author.username}</p>
                    <span className="separator">·</span>
                    <p className="date">{tweet.createdAt}</p>

                    <button className="tweet-btn more" disabled={!user} onClick={handleMore}>
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <IoEllipsisHorizontal size="16" />
                            </IconContext.Provider>
                        </div>
                    </button>
                </div>

                <div className="tweet-content">
                    <p className="tweet_text">{tweet.content}</p>
                </div>

                <div className="tweet-actions">
                    <button className={`tweet-btn comment ${replied && "applied"}`} disabled={!user} onClick={handleReply}>
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                {replied ? <FaComment size="15.5" /> : <FaRegComment size="15.5" />}
                            </IconContext.Provider>
                        </div>
                        <p>{tweet.replies.length}</p>
                    </button>
                    <button className={`tweet-btn retweet ${retweeted && "applied"}`} disabled={!user} onClick={handleRetweet}>
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <BiRepost size="21" />
                            </IconContext.Provider>
                        </div>
                        <p>{tweet.retweets.length}</p>
                    </button>
                    <button className={`tweet-btn like ${liked && "applied"}`} disabled={!user} onClick={handleLike}>
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                {liked ? <AiFillHeart size="18" /> : <AiOutlineHeart size="18" />}
                            </IconContext.Provider>
                        </div>
                        <p>{tweet.likes.length}</p>
                    </button>
                    <button className="tweet-btn view" disabled={!user} onClick={handleShare}>
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <IoMdStats size="19" />
                            </IconContext.Provider>
                        </div>
                        <p>{tweet.views.length}</p>
                    </button>
                    <button className="tweet-btn share" disabled={!user} onClick={handleShare}>
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <TbShare2 size="19" />
                            </IconContext.Provider>
                        </div>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default Tweet;
