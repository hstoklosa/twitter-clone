import "./styles.css";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { LuRepeat2 } from "react-icons/lu";
import { TbPinned } from "react-icons/tb";

import { useAppSelector } from "../../../app/store";
import { useGetUserInfoQuery } from "../../../features/api/userApi";

import {
    TweetDetails,
    TweetActions,
    QuotePreview,
    TweetContent,
    ConditionalLink,
    PfpContainer
} from "../../index";

import { isObjEmpty } from "../../../utils/object";


const TweetPreview = ({
    tweet,
    displayReply = true,
    tweetDate = true,
    viewingId = null,
    viewingUsername = null,
    pin = false,
    onDelete = () => { },
    measure = () => { }
}) => {
    const { pathname } = useLocation();

    const { isAuth, user: currentUser } = useAppSelector((state) => state.auth);
    const { data: currentUserInfo } = useGetUserInfoQuery(currentUser?.username, {
        skip: !currentUser?.username,
    });

    const isReply = tweet.replyTo && !isObjEmpty(tweet.replyTo);
    const isQuote = tweet.quoteTo && !isObjEmpty(tweet.quoteTo);
    // const isRetweet = tweet.retweets.includes(currentUser.id);

    const viewAs = viewingId || currentUserInfo?.username;
    const media = tweet.media?.[0];


    return (
        <IconContext.Provider value={{ className: "tweet_icon" }}>
            <ConditionalLink
                className="tweet"
                condition={isAuth}
                to={`/${tweet.author.username}/status/${tweet._id}`}
                state={{ previousPath: pathname }}
            >
                {pin && (
                    <div className="special-info pin">
                        <TbPinned className="special-info-icon" />
                        <p>Pinned</p>
                    </div>
                )}

                {(viewingId && tweet.retweets && tweet.retweets.includes(viewingId)) && (
                    <span className="special-info">
                        <LuRepeat2 className="special-info-icon" />
                        {
                            viewingId === currentUser.id
                                ? "You retweeted"
                                : `${viewingUsername} retweeted`
                            // tweet.retweets && tweet.retweets.includes(viewing)
                            //     ? "You retweeted"
                            //     : `${viewing} retweeted`
                        }
                    </span>
                )}

                <div className="tweet-wrapper">
                    <PfpContainer src={tweet.author.profileImageURL} />

                    <div className="tweet-container">
                        <TweetDetails tweet={tweet} date={tweetDate} onDelete={onDelete} />

                        {(isReply && displayReply) && (
                            <span className="replyingTo">
                                <p>Replying to </p>

                                <Link
                                    to={`/${tweet.replyTo.author.username}`}
                                    state={{ previousPath: pathname }}
                                    className="link-blue"
                                >
                                    @{tweet.replyTo.author.username}
                                </Link>
                            </span>
                        )}

                        <TweetContent
                            content={tweet.content}
                            media={media}
                            measure={measure}
                        />

                        {isQuote && <QuotePreview tweet={tweet.quoteTo} />}

                        <TweetActions
                            tweet={tweet}
                            currentUser={currentUserInfo}
                        />
                    </div>
                </div>
            </ConditionalLink>
        </IconContext.Provider>
    );
}

export default TweetPreview;
