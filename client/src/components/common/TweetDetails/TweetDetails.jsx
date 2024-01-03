import "./styles.css";

import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TbTrash, TbPinned } from "react-icons/tb";
import { IoMdStats } from "react-icons/io";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";

import { useAppSelector } from "../../../app/store";
import useModal from "../../../hooks/useModal";

import { useDeleteTweetMutation } from "../../../features/api/tweetApi";
import { useFollowUserMutation, useUnfollowUserMutation } from "../../../features/api/userApi";

import { LinkButton, FloatOptions } from "../../index";
import { getTimeDifference } from "../../../helpers/date";

const TweetDetails = ({
    tweet,
    date = true,
    onDelete
}) => {
    const {
        isOpen: isMoreFloatOpen,
        open: openMoreFloatModal,
        close: closeMoreFloatModal
    } = useModal();

    const { user: currentUser } = useAppSelector((state) => state.auth);
    const { pathname } = useLocation();

    const [deleteTweet] = useDeleteTweetMutation();
    const [followUser, followResult] = useFollowUserMutation();
    const [unfollowUser, unfollowResult] = useUnfollowUserMutation();

    const isFollowingAuthor = tweet.author.followers.includes(currentUser.id);
    const formattedDate = date ? getTimeDifference(tweet.createdAt) : null;

    const handleTweetDelete = async () => {
        const result = await deleteTweet(tweet._id).unwrap();

        if (!result?.error) {
            onDelete && onDelete();
            closeMoreFloatModal();
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


    return (
        <div className="tweet-details">
            {isMoreFloatOpen && (
                <IconContext.Provider value={{ className: "float-icon" }}>
                    <FloatOptions
                        isOpen={isMoreFloatOpen}
                        onClose={closeMoreFloatModal}
                        className="more-options"
                    >
                        {tweet.author._id === currentUser.id && (
                            <>
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
                            </>
                        )}

                        {tweet.author._id !== currentUser.id && (
                            <>
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
                            </>
                        )}
                    </FloatOptions>
                </IconContext.Provider>
            )}

            <div className="user-info">
                <Link
                    className="display_name"
                    to={`/${tweet.author.username}`}
                >
                    {tweet.author.displayName}
                </Link>

                <p className="username">@{tweet.author.username}</p>

                {date && (
                    <p className="date">
                        <span className="separator">·</span>
                        {formattedDate}
                    </p>
                )}
            </div>


            <LinkButton
                className="blue_round-btn more"
                onClick={openMoreFloatModal}
            >
                <div className="icon-container">
                    <IoEllipsisHorizontal size="16" className="icon" />
                </div>
            </LinkButton>
        </div>
    );
};

export default TweetDetails;
