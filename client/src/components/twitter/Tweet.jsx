import "../../styles/Tweet.css";

import userImage from "../../assets/elon.jpg";

import { IconContext } from "react-icons";
import { BiRepost } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdStats } from "react-icons/io";
import { TbShare2 } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";

const Tweet = () => {
    return (
        <div className="tweet">
            <div className="img-container">
                <a href="#">
                    <img src={userImage} alt="User Image" />
                </a>
            </div>
            <div className="tweet-container">
                <div className="tweet-info">
                    <a href="#" className="display_name">
                        Elon Musk
                    </a>
                    <p className="username">@elonmusk </p>
                    <span className="separator">·</span>
                    <p className="date">Jun 28</p>
                    <button className="tweet-btn more">
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <IoEllipsisHorizontal size="16" />
                            </IconContext.Provider>
                        </div>
                    </button>
                </div>
                <div className="tweet-content">
                    <p className="tweet_text">42+10</p>
                </div>
                <div className="tweet-actions">
                    <button className="tweet-btn comment">
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <FaRegComment size="15" />
                            </IconContext.Provider>
                        </div>
                        <p>10.7K</p>
                    </button>
                    <button className="tweet-btn retweet">
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <BiRepost size="18" />
                            </IconContext.Provider>
                        </div>
                        5,643
                    </button>
                    <button className="tweet-btn like">
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <AiOutlineHeart size="17" />
                            </IconContext.Provider>
                        </div>
                        94.4K
                    </button>
                    <button className="tweet-btn view">
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <IoMdStats size="17" />
                            </IconContext.Provider>
                        </div>
                        2.5M
                    </button>
                    <button className="tweet-btn share">
                        <div className="icon-container">
                            <IconContext.Provider value={{ className: "tweet_icon" }}>
                                <TbShare2 size="18" />
                            </IconContext.Provider>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
