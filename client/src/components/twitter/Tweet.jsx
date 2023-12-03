import "../../styles/Tweet.css";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { PiPencilSimpleLine } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { TbMessageCircle2, TbShare2, TbTrash, TbPinned } from "react-icons/tb";
import { IoMdStats } from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";

import {
    TweetText,
    FloatOptions,
    TweetModal,
    ReplyModal,
    TweetDetails,
    QuotePreview,
    LinkButton,
    ConditionalLink,
} from "../index";

import { useCheckAuthQuery } from "../../store/api/authApi";
import { useDeleteTweetMutation } from "../../store/api/tweetApi";
import {
    useGetUserInfoQuery,
    useLikeTweetMutation,
    useUnlikeTweetMutation,
    useCreateRepostMutation,
    useDeleteRepostMutation,
    useFollowUserMutation,
    useUnfollowUserMutation,
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation,
} from "../../store/api/userApi";

import { isObjEmpty } from "../../utils/object";

const Tweet = ({ tweet }) => {
    const [replyModal, setReplyModal] = useState(false);
    const [quoteModal, setQuoteModal] = useState(false);
    const [retweetFloat, setRetweetFloat] = useState(false);
    const [moreFloat, setMoreFloat] = useState(false);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const {
        data: { isAuthenticated, data: currentUser },
    } = useCheckAuthQuery();

    const { data: currentUserInfo } = useGetUserInfoQuery(currentUser?.username, {
        skip: !currentUser?.username,
    });

    const [deleteTweet] = useDeleteTweetMutation();
    const [createRepost] = useCreateRepostMutation();
    const [deleteRepost] = useDeleteRepostMutation();
    const [likeTweet] = useLikeTweetMutation();
    const [unlikeTweet] = useUnlikeTweetMutation();

    const [followUser, followResult] = useFollowUserMutation();
    const [unfollowUser, unfollowResult] = useUnfollowUserMutation();
    const [createBookmark, createBookmarkResult] = useCreateBookmarkMutation();
    const [deleteBookmark, deleteBookmarkResult] = useDeleteBookmarkMutation();

    const isBookmarked = currentUserInfo.bookmarks.includes(tweet._id);
    const isReposted = tweet.retweets.includes(currentUser.id);
    const isLiked = tweet.likes.includes(currentUser.id);
    const isFollowingAuthor = tweet.author.followers.includes(currentUser.id);

    const isReply = tweet.replyTo && !isObjEmpty(tweet.replyTo);
    const isQuote = tweet.quoteTo && !isObjEmpty(tweet.quoteTo);

    const media = tweet.media?.[0];

    const handlePostClick = (e) => {
        return isAuthenticated && navigate(`/${tweet.author.username}/status/${tweet._id}`);
    };

    const handleTweetDelete = async () => {
        const result = await deleteTweet(tweet._id).unwrap();

        if (!result?.error) {
            closeMoreFloat();
        }
    };

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
        isLiked ? await unlikeTweet({ id: tweet._id }) : await likeTweet({ id: tweet._id });
    };

    const handleBookmark = async () => {
        const bookmarkData = {
            tweetId: tweet._id,
            userId: currentUser.id,
        };

        isBookmarked ? await deleteBookmark(bookmarkData) : await createBookmark(bookmarkData);
    };

    const handleFollow = async () => {
        const followData = {
            id: currentUser.id,
            targetUserId: tweet.author._id,
        };

        isFollowingAuthor ? await unfollowUser(followData) : await followUser(followData);
    };

    const openReplyModal = () => setReplyModal(true);
    const closeReplyModal = () => setReplyModal(false);

    const openQuoteModal = () => {
        setQuoteModal(true);
        setRetweetFloat(false);
    };
    const closeQuoteModal = () => setQuoteModal(false);

    const openRetweetFloat = () => setRetweetFloat(true);
    const closeRetweetFloat = () => setRetweetFloat(false);

    const openMoreFloat = () => setMoreFloat(true);
    const closeMoreFloat = () => setMoreFloat(false);

    return (
        <IconContext.Provider value={{ className: "tweet_icon" }}>
            {replyModal && (
                <ReplyModal
                    isOpen={replyModal}
                    onClose={closeReplyModal}
                    replyingTo={tweet}
                />
            )}

            {quoteModal && (
                <TweetModal
                    isOpen={quoteModal}
                    onClose={closeQuoteModal}
                    quote={tweet}
                />
            )}

            <ConditionalLink
                className="tweet"
                to={`/${tweet.author.username}/status/${tweet._id}`}
                state={{ previousPath: pathname }}
                condition={isAuthenticated}
            >
                {moreFloat && (
                    <IconContext.Provider value={{ className: "float-icon" }}>
                        {tweet.author._id === currentUser.id && (
                            <FloatOptions
                                isOpen={moreFloat}
                                onClose={closeMoreFloat}
                                className="more-options"
                            >
                                <LinkButton
                                    type="button"
                                    className="float-btn delete"
                                    onClick={handleTweetDelete}
                                >
                                    <div className="float-icon-container">
                                        <TbTrash />
                                    </div>
                                    Delete
                                </LinkButton>

                                <LinkButton
                                    type="button"
                                    className="float-btn"
                                    disabled
                                >
                                    <div className="float-icon-container">
                                        <TbPinned />
                                    </div>
                                    Pin to your profile
                                </LinkButton>

                                <LinkButton
                                    type="button"
                                    className="float-btn"
                                    disabled
                                >
                                    <div className="float-icon-container">
                                        <TbMessageCircle2 />
                                    </div>
                                    Change who can reply
                                </LinkButton>
                                <LinkButton
                                    className="float-btn"
                                    to={`/${tweet.author.username}/status/${tweet._id}/quotes`}
                                    state={{ previousPath: pathname }}
                                >
                                    <div className="float-icon-container">
                                        <IoMdStats />
                                    </div>
                                    View post engagements
                                </LinkButton>
                            </FloatOptions>
                        )}

                        {tweet.author._id !== currentUser.id && (
                            <FloatOptions
                                isOpen={moreFloat}
                                onClose={closeMoreFloat}
                                className="more-options"
                            >
                                <LinkButton
                                    type="button"
                                    className="float-btn"
                                    onClick={handleFollow}
                                >
                                    <div className="float-icon-container">
                                        {isFollowingAuthor ? (
                                            <RiUserUnfollowLine style={{ strokeWidth: 0 }} />
                                        ) : (
                                            <RiUserFollowLine style={{ strokeWidth: 0 }} />
                                        )}
                                    </div>
                                    {isFollowingAuthor ? "Unfollow" : "Follow"} @
                                    {tweet.author.username}
                                </LinkButton>

                                <LinkButton
                                    type="button"
                                    className="float-btn"
                                    disabled
                                >
                                    <div className="float-icon-container">
                                        <MdBlock style={{ strokeWidth: 0 }} />
                                    </div>
                                    Block @{tweet.author.username}
                                </LinkButton>

                                <Link
                                    to={`/${tweet.author.username}/status/${tweet._id}/quotes`}
                                    state={{ previousPath: pathname }}
                                    className="float-btn"
                                >
                                    <div className="float-icon-container">
                                        <IoMdStats />
                                    </div>
                                    View post engagements
                                </Link>
                            </FloatOptions>
                        )}
                    </IconContext.Provider>
                )}

                <div className="img-container">
                    <Link
                        to={`/${tweet.author.username}`}
                        state={{ previousPath: pathname }}
                        onClick={handlePostClick}
                        className="pfp-container"
                    >
                        <img
                            src={tweet.author.profileImageURL}
                            className="pfp"
                            alt="User Pfp"
                        />
                    </Link>
                </div>

                <div className="tweet-container">
                    {/* {username} retweeted */}
                    {tweet.author._id !== currentUser.id && <p>{}</p>}

                    <TweetDetails tweet={tweet}>
                        <LinkButton
                            className="tweet-btn more"
                            onClick={openMoreFloat}
                        >
                            <div className="icon-container">
                                <IoEllipsisHorizontal size="16" />
                            </div>
                        </LinkButton>
                    </TweetDetails>

                    {isReply && (
                        <span className="replyingTo">
                            Replying to{" "}
                            <Link
                                to={`/${tweet.replyTo.author.username}`}
                                state={{ previousPath: pathname }}
                                className="link-blue"
                            >
                                @{tweet.replyTo.author.username}
                            </Link>
                        </span>
                    )}

                    <div className="tweet-content">
                        <TweetText text={tweet.content} />

                        {media && (
                            <div className="media-container">
                                <img
                                    src={media.url}
                                    className="tweet_media"
                                    alt="Tweet Media"
                                />
                            </div>
                        )}
                    </div>

                    {isQuote && <QuotePreview tweet={tweet.quoteTo} />}

                    <div className="tweet-actions">
                        <LinkButton
                            className={`tweet-btn comment`}
                            onClick={openReplyModal}
                        >
                            <div className="icon-container">
                                <TbMessageCircle2 />
                            </div>

                            <div className="count-container">
                                <span>{tweet.repliesCount}</span>
                            </div>
                        </LinkButton>

                        <LinkButton
                            className={`tweet-btn retweet ${isReposted && "applied"}`}
                            onClick={openRetweetFloat}
                        >
                            <div className="icon-container">
                                <LuRepeat2 />
                            </div>

                            <div className="count-container">
                                <span>{tweet.retweets.length}</span>
                            </div>

                            {retweetFloat && (
                                <IconContext.Provider value={{ className: "float-icon" }}>
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
                            className={`tweet-btn like ${isLiked && "applied"}`}
                            data-type="inner-button"
                            onClick={handleLike}
                        >
                            <div className="icon-container">
                                {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                            </div>

                            <div className="count-container">
                                <span>{tweet.likes.length}</span>
                            </div>
                        </LinkButton>

                        <LinkButton
                            className="tweet-btn view"
                            disabled
                        >
                            <div className="icon-container">
                                <IoMdStats />
                            </div>

                            <div className="count-container">
                                <span>0</span>
                            </div>
                        </LinkButton>

                        <div className="tweet-actions-container">
                            <LinkButton
                                type="button"
                                className="tweet-btn bookmark"
                                onClick={handleBookmark}
                            >
                                <div className="icon-container">
                                    {isBookmarked ? <BiSolidBookmark /> : <BiBookmark />}
                                </div>
                            </LinkButton>

                            <LinkButton
                                className="tweet-btn share"
                                disabled
                            >
                                <div className="icon-container">
                                    <TbShare2 />
                                </div>
                            </LinkButton>
                        </div>
                    </div>
                </div>
            </ConditionalLink>
        </IconContext.Provider>
    );
};

export default Tweet;
