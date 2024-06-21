import "./styles.css";

import { useEffect, useState, useRef } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/store";

import { useGetUserInfoQuery } from "../../features/api/userApi";
import { useGetTweetQuery, useGetRepliesQuery } from "../../features/api/tweetApi";

import {
    LeftColumn,
    MiddleColumn,
    ColumnHeader,
    TweetForm,
    TweetDetails,
    Spinner,
    Links,
    PaginatedList,
    ErrorPlaceholder,
    TweetPreview,
    QuotePreview,
    TweetActions,
    TweetContent,
    SearchBar,
    Trending,
    Connect,
    PfpContainer
} from "../../components";

import { formatDate, formatTime } from "../../helpers/date";
import { isObjEmpty } from "../../utils/object";


const Tweet = () => {
    const scrollRef = useRef(null);
    const { tweetId } = useParams();
    const navigate = useNavigate();

    const { user: currentUser } = useAppSelector((state) => state.auth);
    const { data: currentUserInfo } = useGetUserInfoQuery(currentUser?.username, {
        skip: !currentUser?.username,
    });

    const {
        data: tweet,
        isLoading,
        isFetching,
        isError
    } = useGetTweetQuery(tweetId);

    const {
        data: originalTweet,
        isLoading: isOriginalLoading,
        isFetching: isOriginalFetching,
        isError: isOriginalError
    } = useGetTweetQuery(tweet?.replyTo?._id);

    // useEffect(() => {
    //     scrollRef.current && scrollRef.current.scrollIntoView({
    //         behavior: 'smooth',
    //     });
    // }, [scrollRef]);

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


    return (
        <main className="tweet-route">
            <MiddleColumn className="tweet-route_general">
                <ColumnHeader
                    className="tweet-route-header"
                    routerBack={true}
                >
                    <h1>Post</h1>
                </ColumnHeader>

                <div className="route_wrapper">
                    {(!isLoading && !isError) && (
                        <>
                            <section className="relevant-tweets">
                                {tweet?.replyTo && (
                                    <div className="relevant-tweet original-tweet">
                                        {isOriginalLoading && <Spinner />}
                                        {isOriginalError && <ErrorPlaceholder />}

                                        {(originalTweet && !isOriginalLoading && !isOriginalError) && (
                                            <TweetPreview
                                                tweet={originalTweet}
                                                onDelete={() => navigate("/home")}
                                            />
                                        )}
                                    </div>
                                )}


                                <div
                                    className="relevant-tweet current-tweet"
                                    ref={scrollRef}
                                >
                                    {isLoading && <Spinner />}
                                    {isError && <ErrorPlaceholder />}

                                    {(tweet && !isLoading && !isError) && (
                                        <>
                                            <div className="tweet-details_wrapper">
                                                <PfpContainer src={tweet?.author.profileImageURL} />

                                                <TweetDetails
                                                    tweet={tweet}
                                                    date={false}
                                                    onDelete={() => navigate("/home")}
                                                />
                                            </div>

                                            <TweetContent
                                                content={tweet.content}
                                                media={media}
                                            />

                                            {isQuote && <QuotePreview tweet={tweet.quoteTo} />}

                                            <div className="tweet-stats">
                                                <Link className="link">
                                                    <span className="stat date">
                                                        {timeCreatedAt}
                                                    </span>

                                                    <span className="separator">
                                                        ·
                                                    </span>

                                                    <span className="stat date">
                                                        {dateCreatedAt}
                                                    </span>
                                                </Link>

                                                <span className="separator">·</span>

                                                <span className="views">
                                                    {0} <span className="stat">Views</span>
                                                </span>
                                            </div>
                                        </>
                                    )}


                                </div>
                            </section>

                            <TweetActions
                                tweet={tweet}
                                currentUser={currentUserInfo}
                            />

                            <TweetForm
                                replyTo={tweet._id}
                                forceExpand={true}
                                maxLength={280}
                                placeholder="Post your reply"
                                buttonValue="Reply"
                            />

                            <PaginatedList
                                queryHook={useGetRepliesQuery}
                                args={{ id: tweetId }}
                                renderItem={(data) => <TweetPreview tweet={data} />}
                                renderPlaceholder={() => { }}
                            />
                        </>
                    )}
                </div>
            </MiddleColumn>

            <LeftColumn>
                <SearchBar />
                <Trending />
                <Connect />
                <Links />
            </LeftColumn>
        </main >
    );
};

export default Tweet;