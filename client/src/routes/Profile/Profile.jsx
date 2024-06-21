import "./styles.css";

import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useLocation } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IconContext } from "react-icons";
import { BiCalendar, BiEnvelope, BiLink } from "react-icons/bi";
import { LuMail } from "react-icons/lu";
import { RxEnvelopeClosed } from "react-icons/rx";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineLink } from "react-icons/ai";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TbBellPlus } from "react-icons/tb";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { modalActions } from "../../features/slices/modalSlice";
import {
    useGetUserInfoQuery,
    useGetUserTweetsQuery,
    useGetUserLikesQuery,
    useGetUserMediaQuery,
    useGetUserRepliesQuery
} from "../../features/api/userApi";

import {
    ColumnHeader,
    Links,
    Spinner,
    FollowButton,
    Connect,
    SearchBar,
    MiddleColumn,
    LeftColumn,
    Trending,
    TweetPreview,
    PaginatedList,
    TabList,
    Placeholder,
    TabPanel
} from "../../components";

import { formatDate } from "../../helpers/date";


const Profile = () => {
    const [currentTab, setCurrentTab] = useState(null);

    const { username } = useParams();
    const { pathname } = useLocation();

    const { user: currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const { isCurrentUser, profileUser, isProfileLoading, isProfileFetching } = useGetUserInfoQuery(username, {
        selectFromResult: ({ data, isLoading, isFetching }) => ({
            isCurrentUser: currentUser.username === username,
            profileUser: data,
            isProfileLoading: isLoading,
            isProfileFetching: isFetching

        }),
    });

    const createdAt = formatDate(profileUser?.createdAt, {
        year: "numeric",
        month: "long",
    });
    const isFollowed = !isCurrentUser && profileUser?.followers.includes(currentUser.id);

    // if (!isProfileLoading && profileUser?.username === username) {
    //     return <></>
    // }

    return (
        <main>
            <MiddleColumn className="profile-route">
                {!isProfileLoading ? (
                    // profileUser ? (
                    <>
                        <Helmet>
                            {profileUser ? (
                                <title>{profileUser.displayName} (@{profileUser.username}) / X</title>
                            ) : (
                                <title>Profile / X</title>
                            )}
                        </Helmet>

                        <ColumnHeader routerBack={true}>
                            <div className="profile-summary truncate">
                                {profileUser ? (
                                    <>
                                        <h1 className="truncate">{profileUser.displayName}</h1>

                                        {currentTab === "tweets" && <p>{profileUser.tweetCount || 0} Tweets</p>}
                                        {currentTab === "replies" && <p>{profileUser.tweetCount || 0} Tweets</p>}
                                        {currentTab === "media" && <p>{profileUser.mediaCount || 0} Photos & videos</p>}
                                        {currentTab === "likes" && <p>{profileUser.likeCount || 0} Likes</p>}
                                    </>
                                ) : (
                                    <h1 className="truncate">Profile</h1>
                                )}
                            </div>
                        </ColumnHeader>

                        <section className="profile">
                            <div className="banner-container">
                                {profileUser?.bannerURL ? (
                                    <div className="banner-img-container">
                                        {/* <img
                                            src={profileUser.bannerURL}
                                            className="banner"
                                            alt="User Banner"
                                            onClick={() => dispatch(modalActions.openModal({
                                                name: "MediaModal",
                                                props: { url: profileUser.bannerURL }
                                            }))}
                                        /> */}
                                        <LazyLoadImage
                                            className="banner"
                                            style={{
                                                width: '100% !important',
                                                height: '100% !important',
                                            }}
                                            src={profileUser.bannerURL}
                                            alt="User Banner"
                                            onClick={() => dispatch(modalActions.openModal({
                                                name: "MediaModal",
                                                props: { url: profileUser.bannerURL }
                                            }))}
                                        />
                                    </div>
                                ) : (
                                    <div className="banner-img-container empty" />
                                )}

                                {profileUser ? (
                                    <div
                                        className="pfp-container"
                                        onClick={() => dispatch(modalActions.openModal({
                                            name: "MediaModal",
                                            props: { url: profileUser.profileImageURL }
                                        }))}
                                    >
                                        <img
                                            src={profileUser.profileImageURL}
                                            className="pfp"
                                            alt="User PFP"
                                        />
                                    </div>
                                ) : (
                                    <div className="pfp-container empty" />
                                )}
                            </div>

                            {(profileUser && isCurrentUser) && (
                                <div className="options-container">
                                    <button
                                        className="edit btn-empty"
                                        onClick={() => dispatch(modalActions.openModal({
                                            name: "EditModal",
                                            props: { user: profileUser }
                                        }))}
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            )}

                            {(profileUser && !isCurrentUser) && (
                                <IconContext.Provider
                                    value={{ className: "reply_icon" }}
                                >
                                    <div className="options-container">
                                        <button
                                            className="btn-empty more"
                                            disabled
                                        >
                                            <IoEllipsisHorizontal size="16" />
                                        </button>

                                        <button
                                            className="btn-empty message"
                                            disabled
                                        >
                                            <LuMail size="16" />
                                        </button>

                                        <button
                                            className="btn-empty notify"
                                            disabled
                                        >
                                            <TbBellPlus size="16" />
                                        </button>

                                        <FollowButton
                                            isFollowing={isFollowed}
                                            targetUserId={profileUser._id}
                                            targetUserName={profileUser.username}
                                        />
                                    </div>
                                </IconContext.Provider>
                            )}

                            {!profileUser ? (
                                <Placeholder
                                    title="This account doesn't exist"
                                    subtitle="Try searching for another."
                                />
                            ) : (
                                <>
                                    <div className="info-container">
                                        <h1 className="displayName">{profileUser.displayName}</h1>
                                        <p className="username">@{profileUser.username}</p>
                                        <p className="biography">{profileUser.bio}</p>

                                        <IconContext.Provider value={{ className: "icon" }}>
                                            <div className="icon-info">
                                                {profileUser.location && (
                                                    <div className="icon-info_item">
                                                        <HiOutlineLocationMarker size="18" />
                                                        <p>{profileUser.location}</p>
                                                    </div>
                                                )}

                                                {profileUser.website && (
                                                    <div className="icon-info_item truncate">
                                                        <BiLink size="18" />
                                                        <a
                                                            href={`https://${profileUser.website}`}
                                                            target="__blank"
                                                            className="link-blue truncate"
                                                        >
                                                            <p className="truncate">{profileUser.website}</p>
                                                        </a>
                                                    </div>
                                                )}

                                                {profileUser.createdAt && (
                                                    <div className="icon-info_item">
                                                        <BiCalendar size="18" />
                                                        <p>Joined {createdAt}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </IconContext.Provider>

                                        <div className="counts">
                                            <Link
                                                to={`/${profileUser.username}/following`}
                                                state={{ previousPath: pathname }}
                                                className="count"
                                            >
                                                <span>
                                                    {profileUser.following.length}
                                                </span>
                                                Following
                                            </Link>

                                            <Link
                                                to={`/${profileUser.username}/followers`}
                                                state={{ previousPath: pathname }}
                                                className="count"
                                            >
                                                <span>
                                                    {profileUser.followers.length}
                                                </span>
                                                Followers
                                            </Link>
                                        </div>
                                    </div>

                                    <section className="tweets">
                                        <TabList
                                            options={{
                                                tabs: ["tweets", "replies", "media", "likes"],
                                                index: `/${profileUser.username}`
                                            }}
                                            setOuterTab={setCurrentTab}
                                        >
                                            <TabPanel name="tweets">
                                                {profileUser?.pin && (
                                                    <TweetPreview tweet={profileUser.pin} pin={true} />
                                                )}

                                                <PaginatedList
                                                    queryHook={useGetUserTweetsQuery}
                                                    args={{ id: profileUser?._id }}
                                                    options={{ skip: !profileUser }}
                                                    renderItem={(data) =>
                                                        <TweetPreview tweet={data}
                                                            viewingId={profileUser._id}
                                                            viewingUsername={profileUser.username}
                                                        />
                                                    }
                                                    renderPlaceholder={() => (
                                                        <Placeholder
                                                            title={`@${username} hasn't posted any tweets`}
                                                            subtitle="Once they do, those tweets will show up here."
                                                        />
                                                    )}
                                                />
                                            </TabPanel>

                                            <TabPanel name="replies">
                                                <PaginatedList
                                                    queryHook={useGetUserRepliesQuery}
                                                    args={{ id: profileUser?._id }}
                                                    options={{ skip: !profileUser }}
                                                    renderItem={(data) =>
                                                        <TweetPreview tweet={data} />
                                                    }
                                                    renderPlaceholder={() => (
                                                        <Placeholder
                                                            title={`@${username} hasn't posted any tweets`}
                                                            subtitle="Once they do, those tweets will show up here."
                                                        />
                                                    )}
                                                />
                                            </TabPanel>

                                            <TabPanel name="media">
                                                <PaginatedList
                                                    queryHook={useGetUserMediaQuery}
                                                    args={{ id: profileUser?._id }}
                                                    options={{ skip: !profileUser }}
                                                    renderItem={(data) =>
                                                        <TweetPreview tweet={data} />
                                                    }
                                                    renderPlaceholder={() => (
                                                        <Placeholder
                                                            title={`@${username} hasn't posted media`}
                                                            subtitle="Once they do, those posts will show up here."
                                                        />
                                                    )}
                                                />
                                            </TabPanel>

                                            <TabPanel name="likes">
                                                <PaginatedList
                                                    queryHook={useGetUserLikesQuery}
                                                    args={{ id: profileUser?._id }}
                                                    options={{ skip: !profileUser }}
                                                    renderItem={(data) =>
                                                        <TweetPreview tweet={data} />
                                                    }
                                                    renderPlaceholder={() => (
                                                        <Placeholder
                                                            title={`@${username} hasn't liked any posts`}
                                                            subtitle="When they do, those posts will show up here."
                                                        />
                                                    )}
                                                />
                                            </TabPanel>
                                        </TabList>
                                    </section>
                                </>
                            )}
                        </section>
                    </>
                ) : (
                    <Spinner />
                )}
            </MiddleColumn>

            <LeftColumn>
                <SearchBar />
                <Connect />
                <Trending />
                <Links />
            </LeftColumn>
        </main >
    );
};


export default Profile;
