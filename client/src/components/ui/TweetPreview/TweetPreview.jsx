import "./styles.css";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { TbMessageCircle2, TbTrash, TbPinned } from "react-icons/tb";
import { IoMdStats } from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { MdBlock } from "react-icons/md";

import {
    TweetText,
    FloatOptions,
    TweetModal,
    ReplyModal,
    TweetDetails,
    TweetActions,
    QuotePreview,
    LinkButton,
    ConditionalLink,
} from "../../index";

import { useAppSelector } from "../../../app/store";

import { useDeleteTweetMutation } from "../../../features/api/tweetApi";
import {
    useGetUserInfoQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
} from "../../../features/api/userApi";

import { isObjEmpty } from "../../../utils/object";

const TweetPreview = ({ tweet, displayReply = true }) => {
    const [replyModal, setReplyModal] = useState(false);
    const [quoteModal, setQuoteModal] = useState(false);
    const [retweetFloat, setRetweetFloat] = useState(false);
    const [moreFloat, setMoreFloat] = useState(false);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { isAuth, user: currentUser } = useAppSelector((state) => state.auth);

    const { data: currentUserInfo } = useGetUserInfoQuery(currentUser?.username, {
        skip: !currentUser?.username,
    });

    const [deleteTweet] = useDeleteTweetMutation();
    const [followUser, followResult] = useFollowUserMutation();
    const [unfollowUser, unfollowResult] = useUnfollowUserMutation();

    const isFollowingAuthor = tweet.author.followers.includes(currentUser.id);
    const isReply = tweet.replyTo && !isObjEmpty(tweet.replyTo);
    const isRetweet = tweet.retweets.includes(currentUser.id);
    const isQuote = tweet.quoteTo && !isObjEmpty(tweet.quoteTo);

    const media = tweet.media?.[0];

    const handlePostClick = (e) => {
        return isAuth && navigate(`/${tweet.author.username}/status/${tweet._id}`);
    };

    const handleTweetDelete = async () => {
        const result = await deleteTweet(tweet._id).unwrap();

        if (!result?.error) {
            closeMoreFloat();
        }
    };


    const handleFollow = async () => {
        const followData = {
            id: currentUser.id,
            targetUserId: tweet.author._id,
        };

        isFollowingAuthor
            ? await unfollowUser(followData)
            : await followUser(followData);
    };

    const openReplyModal = () => setReplyModal(true);
    const closeReplyModal = () => setReplyModal(false);

    const openQuoteModal = () => {
        setQuoteModal(true);
        setRetweetFloat(false);
    };
    const closeQuoteModal = () => setQuoteModal(false);

    const openMoreFloat = () => setMoreFloat(true);
    const closeMoreFloat = () => setMoreFloat(false);

    console.log(tweet, currentUser);

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
                condition={isAuth}
                to={`/${tweet.author.username}/status/${tweet._id}`}
                state={{ previousPath: pathname }}
            >
                <IconContext.Provider value={{ className: "float-icon" }}>
                    {moreFloat && (
                        <>
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

                                        {isFollowingAuthor ? "Unfollow" : "Follow"} @{tweet.author.username}
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
                        </>
                    )}
                </IconContext.Provider>

                <div
                    className="pfp-container"
                    onClick={handlePostClick}
                >
                    <img
                        src={tweet.author.profileImageURL}
                        className="pfp"
                        alt="User Pfp"
                    />
                </div>

                <div className="tweet-container">
                    {/* {username} retweeted */}
                    {isRetweet && <span className="replyingTo">You retweeted</span>}

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

                    {(isReply && !displayReply) && (
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

                    <TweetActions
                        tweet={tweet}
                        currentUser={currentUserInfo}
                        openQuoteModal={openQuoteModal}
                        openReplyModal={openReplyModal}
                    />
                </div>
            </ConditionalLink>
        </IconContext.Provider>
    );
};

export default TweetPreview;
