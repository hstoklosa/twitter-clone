import "./styles.css";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";

import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useAppSelector } from "../../app/store";
import { useGetUserInfoQuery } from "../../features/api/userApi";
import { useGetTweetQuery, useGetRepliesQuery } from "../../features/api/tweetApi";

import {
    LeftColumn,
    MiddleColumn,
    ColumnHeader,
    TweetForm,
    TweetText,
    Spinner,
    Links,
    PaginatedList,
    ErrorPlaceholder,
    TweetPreview,
    QuotePreview,
    TweetActions,
    ReplyModal,
    TweetModal
} from "../../components";

import { formatDate, formatTime } from "../../helpers/date";
import { isObjEmpty } from "../../utils/object";

const Tweet = () => {
    const { tweetId } = useParams();

    const [replyModal, setReplyModal] = useState(false);
    const [quoteModal, setQuoteModal] = useState(false);

    const { isAuth, user: currentUser } = useAppSelector((state) => state.auth);

    const { data: currentUserInfo } = useGetUserInfoQuery(currentUser?.username, {
        skip: !currentUser?.username,
    });
    const { data: tweet, isLoading, isFetching, isError } = useGetTweetQuery(tweetId);

    const queryResult = useInfiniteScroll(useGetRepliesQuery, { id: tweetId })


    const isQuote = tweet?.quoteTo && !isObjEmpty(tweet.quoteTo);
    const media = tweet?.media?.[0];

    const timeCreatedAt = formatTime(tweet?.createdAt, {
        hour: "numeric",
        minute: "numeric"
    });
    const dateCreatedAt = formatDate(tweet?.createdAt, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    const openReplyModal = () => setReplyModal(true);
    const closeReplyModal = () => setReplyModal(false);

    const openQuoteModal = () => setQuoteModal(true);
    const closeQuoteModal = () => setQuoteModal(false);

    console.log(tweet, isLoading, isFetching, isError);

    return (
        <main className="tweet-route">
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

            <MiddleColumn className="tweet-route_general">
                <ColumnHeader
                    className="tweet-route-header"
                    routerBack={true}
                >
                    <h1>Post</h1>
                </ColumnHeader>

                {isLoading && <Spinner />}
                {isError && <ErrorPlaceholder />}

                {(!isLoading && !isError) && (
                    <>
                        <section className="relevant-tweets">
                            {tweet.replyTo && (
                                <div className="original-tweet">
                                    <TweetPreview tweet={tweet.replyTo} />
                                </div>
                            )}

                            <div className="current-tweet">
                                <div className="tweet-details">
                                    <div className="user-info">
                                        <div className="pfp-container">
                                            <div className="icon-container">
                                                <img
                                                    src={tweet?.author.profileImageURL}
                                                    className="pfp"
                                                    alt="Profile Pfp"
                                                />
                                            </div>
                                        </div>
                                        <div className="wrapper">
                                            <h2 className="displayName">{tweet.author.displayName}</h2>
                                            <p className="username">@{tweet.author.username}</p>
                                        </div>
                                    </div>

                                    <button className="blue_round-btn">
                                        <div className="icon-container">
                                            <IoEllipsisHorizontal className="icon" />
                                        </div>
                                    </button>
                                </div>

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


                                <div className="tweet-stats">
                                    <Link className="link">
                                        <span className="stat date">
                                            {timeCreatedAt}
                                        </span>
                                        <span className="separator">·</span>
                                        <span className="stat date">
                                            {dateCreatedAt}
                                        </span>
                                    </Link>

                                    <span className="separator">·</span>

                                    <span className="views">
                                        {1} <span className="stat">Views</span>
                                    </span>
                                </div>
                            </div>
                        </section>

                        <TweetActions
                            tweet={tweet}
                            currentUser={currentUserInfo}
                            openReplyModal={openReplyModal}
                            openQuoteModal={openQuoteModal}
                        />

                        <TweetForm
                            replyTo={tweet._id}
                            forceExpand={true}
                            maxLength={280}
                            button="Reply"
                            placeholder="Post your reply"
                        />

                        <PaginatedList
                            queryResult={queryResult}
                            component={TweetPreview}
                        />
                    </>
                )}
            </MiddleColumn>

            <LeftColumn>
                <Links />
            </LeftColumn>
        </main >
    );
};

export default Tweet;
