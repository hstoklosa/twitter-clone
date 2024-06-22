import "./styles.css";

import { Link, useLocation } from "react-router-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TbTrash, TbPinned } from "react-icons/tb";
import { IoMdStats } from "react-icons/io";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";

import { useAppDispatch, useAppSelector } from "../../../app/store";
import useModal from "../../../hooks/useModal";

import { useDeleteTweetMutation } from "../../../features/api/tweetApi";
import { useFollowUserMutation, usePinTweetMutation, useUnpinTweetMutation, useUnfollowUserMutation } from "../../../features/api/userApi";
import { modalActions } from "../../../features/slices/modalSlice";

import { LinkButton, Float, FloatButton } from "../../index";
import { getTimeDifference } from "../../../helpers/date";


const _title = "Delete post?";
const _desc = "This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.";

const TweetDetails = ({
    tweet,
    date = true,
    onDelete
}) => {
    const {
        isOpen: isMoreFloatOpen,
        open: openMoreFloat,
        close: closeMoreFloat
    } = useModal();

    const { user: currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const { pathname } = useLocation();

    const [deleteTweet] = useDeleteTweetMutation();
    const [followUser, followResult] = useFollowUserMutation();
    const [unfollowUser, unfollowResult] = useUnfollowUserMutation();
    const [pinTweet, pinTweetResult] = usePinTweetMutation();
    const [unpinTweet, unpinTweetResult] = useUnpinTweetMutation();

    const isFollowingAuthor = tweet.author.followers.includes(currentUser.id);
    const formattedDate = date ? getTimeDifference(tweet.createdAt) : null;

    const handleTweetDelete = async () => {
        dispatch(modalActions.openModal({
            name: "ActionModal",
            props: {
                title: _title,
                description: _desc,
                mainBtnLabel: "Delete",
                focusOnMainBtn: true,
                action: async () => {
                    const result = await deleteTweet(tweet._id).unwrap();

                    if (!result?.error) {
                        onDelete && onDelete();
                        closeMoreFloat();
                    }
                },
            }
        }))

    };

    const handleTweetPin = async () => {
        const result = await pinTweet({ id: currentUser._id, tweetId: tweet._id });

        if (!result?.error) {
            closeMoreFloat();
        }
    }

    const handleFollow = async () => {
        const followData = {
            id: currentUser.id,
            targetUserId: tweet.author._id,
        };

        isFollowingAuthor
            ? await unfollowUser(followData)
            : await followUser(followData);

        closeMoreFloat();
    };


    return (
        <div className="tweet-details flex-truncate_parent">
            <div className="user-info truncate">
                <Link
                    className="display_name truncate"
                    to={`/${tweet.author.username}`}
                >
                    {tweet.author.displayName}
                </Link>

                <p className="username truncate">@{tweet.author.username}</p>

                {date && (
                    <p className="date">
                        <span className="separator">·</span>
                        {formattedDate}
                    </p>
                )}
            </div>

            <Float
                isOpen={isMoreFloatOpen}
                open={openMoreFloat}
                close={closeMoreFloat}
                positions={['left', 'bottom']}
                // classNames="more-options"
                renderContent={() => (
                    <>
                        {tweet.author._id === currentUser.id && (
                            <>
                                <LinkButton
                                    type="button"
                                    className="float-btn delete"
                                    onClick={handleTweetDelete}
                                >
                                    <div className="float-icon-container">
                                        <TbTrash className="float-icon" />
                                    </div>
                                    Delete
                                </LinkButton>

                                <LinkButton
                                    type="button"
                                    className="float-btn"
                                    onClick={handleTweetPin}
                                >
                                    <div className="float-icon-container">
                                        <TbPinned className="float-icon" />
                                    </div>
                                    Pin to your profile
                                </LinkButton>

                                <LinkButton
                                    className="float-btn"
                                    to={`/${tweet.author.username}/status/${tweet._id}/quotes`}
                                    state={{ previousPath: pathname }}
                                >
                                    <div className="float-icon-container">
                                        <IoMdStats className="float-icon" />
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
                                            <RiUserUnfollowLine
                                                className="float-icon"
                                                style={{ strokeWidth: 0 }}
                                            />
                                        ) : (
                                            <RiUserFollowLine
                                                className="float-icon"
                                                style={{ strokeWidth: 0 }}
                                            />
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
                                        <IoMdStats className="float-icon" />
                                    </div>
                                    View post engagements
                                </Link>
                            </>
                        )}
                    </>
                )}
            >
                <button
                    className="blue_round-btn more"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openMoreFloat();
                    }}
                    data-tooltip-id="action-tooltip"
                    data-tooltip-content="More"
                >
                    <div className="icon-container">
                        <IoEllipsisHorizontal size="16" className="icon float-icon" />
                    </div>
                </button>
            </Float>
        </div>
    );
};

export default TweetDetails;
