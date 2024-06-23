import "./styles.css";

import { toast } from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbPencilMinus } from "react-icons/tb";
import { LuRepeat2 } from "react-icons/lu";
import { TbMessageCircle2, TbShare2 } from "react-icons/tb";
import { IoMdStats } from "react-icons/io";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";

import useModal from "../../../hooks/useModal";

import { useAppDispatch } from "../../../app/store";
import { modalActions } from "../../../features/slices/modalSlice";

import {
    useCreateRepostMutation,
    useDeleteRepostMutation,
} from "../../../features/api/userApi";

import {
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation
} from "../../../features/api/bookmarkApi";

import {
    useLikeTweetMutation,
    useUnlikeTweetMutation,
} from "../../../features/api/tweetApi";

import { LinkButton, Float } from "../../index"


const TweetActions = ({ tweet, currentUser }) => {
    const {
        isOpen: isRepostFloatOpen,
        open: openRepostFloat,
        close: closeRepostFloat
    } = useModal();

    const {
        isOpen: isShareFloatOpen,
        open: openShareFloat,
        close: closeShareFloat
    } = useModal();

    const dispatch = useAppDispatch();

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
            closeRepostFloat();
    };

    const handleLike = async (e) => {
        isLiked
            ? await unlikeTweet({ id: tweet._id, userId: currentUser._id })
            : await likeTweet({ id: tweet._id, userId: currentUser._id });
    };

    const handleBookmark = async () => {
        const bookmarkData = {
            tweetId: tweet._id,
            userId: currentUser._id,
        };

        isBookmarked
            ? await deleteBookmark(bookmarkData)
            : await createBookmark(bookmarkData);
    };

    return (
        <div className="tweet-actions">
            <LinkButton
                className={`action-btn reply blue_round-btn`}
                onClick={() => dispatch(
                    modalActions.openModal({
                        name: "ReplyModal",
                        props: { replyingTo: tweet }
                    })
                )}
                data-tooltip-id="action-tooltip"
                data-tooltip-content="Reply"
            >
                <div className="icon-container">
                    <TbMessageCircle2 className="icon" />
                </div>

                <div className="count-container">
                    <span>{tweet.repliesCount}</span>
                </div>
            </LinkButton>

            <Float
                isOpen={isRepostFloatOpen}
                open={openRepostFloat}
                close={closeRepostFloat}
                className="retweet-options"
                positions={["bottom", "right"]}
                renderContent={() => (
                    <>
                        <LinkButton
                            type="button"
                            className="float-btn"
                            onClick={handleRetweet}
                        >
                            <div className="float-icon-container">
                                <LuRepeat2
                                    size="28"
                                    className="float-icon"
                                />
                            </div>

                            <p style={{ display: "block", width: "auto" }}>
                                {isReposted ? "Undo Repost" : "Repost"}
                            </p>
                        </LinkButton>

                        <LinkButton
                            type="button"
                            className="float-btn"
                            onClick={() => dispatch(
                                modalActions.openModal({
                                    name: "TweetModal",
                                    props: { quote: tweet, placeholder: "Add a comment" }
                                })
                            )}
                        >
                            <div className="float-icon-container">
                                <TbPencilMinus
                                    size="28"
                                    className="float-icon"
                                />
                            </div>

                            <p style={{ display: "block", width: "auto" }}>
                                Quote
                            </p>

                        </LinkButton>
                    </>
                )}
            >
                <button
                    className={`action-btn retweet green_round-btn ${isReposted && "applied"}`}
                    data-tooltip-id="action-tooltip"
                    data-tooltip-content="Repost"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openRepostFloat();
                    }}
                >
                    <div className="icon-container">
                        <LuRepeat2 className="icon" />
                    </div>

                    <div className="count-container">
                        <span>{tweet.retweets.length}</span>
                    </div>
                </button>
            </Float>

            <LinkButton
                type="button"
                className={`action-btn like red_round-btn ${isLiked && "applied"}`}
                data-type="inner-button"
                onClick={handleLike}
                data-tooltip-id="action-tooltip"
                data-tooltip-content={isLiked ? "Unlike" : "Like"}
            >
                <div className="icon-container">
                    {isLiked ? (
                        <AiFillHeart className="icon" />
                    ) : (
                        <AiOutlineHeart className="icon" />
                    )}
                </div>

                <div className="count-container">
                    <span>{tweet.likes.length}</span>
                </div>
            </LinkButton>

            <LinkButton
                className="action-btn view blue_round-btn"
                data-tooltip-id="action-tooltip"
                data-tooltip-content="View"
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
                    className={`action-btn blue_round-btn bookmark ${isBookmarked && "applied"}`}
                    onClick={handleBookmark}
                    data-tooltip-id="action-tooltip"
                    data-tooltip-content={isBookmarked ? "Remove from Bookmarks" : "Bookmark"}
                >
                    <div className="icon-container">
                        {isBookmarked ? (
                            <BiSolidBookmark className="icon" />
                        ) : (
                            <BiBookmark className="icon" />
                        )}
                    </div>
                </LinkButton>

                <Float
                    isOpen={isShareFloatOpen}
                    close={closeShareFloat}
                    className="share-float"
                    positions={["bottom"]}
                    renderContent={() => (
                        <>
                            <LinkButton
                                type="button"
                                className="float-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT_ORIGIN}/${tweet.author.username}/status/${tweet._id}`);
                                    toast.success(
                                        () => <span>Link copied to clipboard.</span >,
                                        { duration: 6000 }
                                    );
                                }}
                            >
                                <div className="float-icon-container">
                                    <AiOutlineLink
                                        size="28"
                                        className="float-icon"
                                    />
                                </div>
                                Copy link
                            </LinkButton>
                        </>
                    )}
                >
                    <button
                        className="action-btn tweet-btn blue_round-btn"
                        data-tooltip-id="action-tooltip"
                        data-tooltip-content="Share"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openShareFloat();
                        }}
                    >
                        <div className="icon-container">
                            <TbShare2 className="icon" />
                        </div>
                    </button>
                </Float>
            </div>
        </div >
    )
}

export default TweetActions;