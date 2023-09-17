import "../styles/Profile.css";

import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { IconContext } from "react-icons";
import { BiCalendar, BiEnvelope, BiLink } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineLink } from "react-icons/ai";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TbBellPlus, TbBellCheck } from "react-icons/tb";

import { ColumnHeader, Links, Spinner, TabList, Feed, ProfileNotFound } from "../components";

import { useCheckAuthQuery } from "../store/api/authApi";
import { useGetUserInfoQuery, useGetUserTweetsQuery } from "../store/api/userApi";

import { formatDate } from "../helpers/date";

const Profile = () => {
    const [tab, setTab] = useState("Tweets");

    const { username } = useParams();

    const {
        data: { info: currentUser },
    } = useCheckAuthQuery();

    const { isCurrentUser, profileUser } = useGetUserInfoQuery(username, {
        selectFromResult: ({ data }) => ({
            isCurrentUser: currentUser.username === username,
            profileUser: data,
        }),
    });

    const { data: tweets, isLoading: tweetsLoading } = useGetUserTweetsQuery(username);

    return (
        <main>
            <div
                className="column"
                id="general"
            >
                {profileUser ? (
                    <>
                        <ColumnHeader routerBack={true}>
                            <div className="profile-summary">
                                <h1>{profileUser.displayName}</h1>

                                {tab === "Tweets" && <p>{profileUser.tweetsCount} Tweets</p>}
                                {tab === "Replies" && <p>{profileUser.tweetsCount} Tweets</p>}
                                {tab === "Media" && <p>{profileUser.mediaCount} Photos & videos</p>}
                                {tab === "Likes" && <p>{profileUser.likesCount} Likes</p>}
                            </div>
                        </ColumnHeader>

                        <section className="profile">
                            <div className="banner-container">
                                {profileUser.bannerURL && (
                                    <img
                                        src={profileUser.bannerURL}
                                        className="banner"
                                        alt="User Banner"
                                    />
                                )}

                                <div className="pfp-container">
                                    <img
                                        src={profileUser.profileImageURL}
                                        className="pfp"
                                        alt="User Profile Picture"
                                    />
                                </div>
                            </div>

                            {isCurrentUser ? (
                                <div className="options-container">
                                    <button className="edit btn-empty">Edit Profile</button>
                                </div>
                            ) : (
                                <IconContext.Provider value={{ className: "reply_icon" }}>
                                    <div className="options-container">
                                        <button className="more btn-empty">
                                            <IoEllipsisHorizontal size="16" />
                                        </button>
                                        <button className="message btn-empty">
                                            <BiEnvelope size="16" />
                                        </button>
                                        <button className="notify btn-empty">
                                            <TbBellPlus size="16" />
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn-empty follow`}
                                        >
                                            <span>Follow</span>
                                        </button>
                                    </div>
                                </IconContext.Provider>
                            )}

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
                                            <div className="icon-info_item">
                                                <BiLink size="18" />
                                                <a
                                                    href={`https://${profileUser.website}`}
                                                    target="__blank"
                                                    className="link-blue"
                                                >
                                                    <p>{profileUser.website}</p>
                                                </a>
                                            </div>
                                        )}

                                        {profileUser.createdAt && (
                                            <div className="icon-info_item">
                                                <BiCalendar size="18" />
                                                <p>
                                                    Joined&nbsp;
                                                    {formatDate(profileUser.createdAt, {
                                                        year: "numeric",
                                                        month: "long",
                                                    })}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </IconContext.Provider>

                                <div className="counts">
                                    <Link
                                        to={`/${profileUser.username}/following`}
                                        className="count"
                                    >
                                        <span>{profileUser.following.length}</span>
                                        Following
                                    </Link>

                                    <Link
                                        to={`/${profileUser.username}/followers`}
                                        className="count"
                                    >
                                        <span>{profileUser.followers.length}</span>
                                        Followers
                                    </Link>
                                </div>
                            </div>
                        </section>

                        <section className="tweets">
                            <TabList
                                tabs={["Tweets", "Replies", "Media", "Likes"]}
                                currentTab={tab}
                                setCurrentTab={setTab}
                            />

                            {tab === "Tweets" && (
                                <Feed
                                    tweets={tweets}
                                    isTweetsLoading={tweetsLoading}
                                />
                            )}
                        </section>
                    </>
                ) : (
                    <ProfileNotFound username={username} />
                )}
            </div>

            <div
                className="column"
                id="widgets"
            >
                <div className="sticky-wrapper">
                    <Links />
                </div>
            </div>
        </main>
    );
};

export default Profile;
