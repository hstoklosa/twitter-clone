import "./styles.css";

import { useState } from "react";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";

import { IconContext } from "react-icons";
import { BiCalendar, BiEnvelope, BiLink } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineLink } from "react-icons/ai";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TbBellPlus, TbBellCheck } from "react-icons/tb";

import { useAppSelector } from "../../app/store";
import { useGetUserInfoQuery } from "../../features/api/userApi";

import ProfileNotFound from "./ProfileNotFound";
import {
    ColumnHeader,
    Links,
    EditProfile,
    FollowButton,
    TabList,
} from "../../components";

import { formatDate } from "../../helpers/date";

const Profile = () => {
    const [tabData, setTabData] = useState({ length: 0 });
    const [editModal, setEditModal] = useState(false);

    const { username } = useParams();
    const { pathname } = useLocation();

    const { user: currentUser } = useAppSelector((state) => state.auth);

    const { isCurrentUser, profileUser } = useGetUserInfoQuery(username, {
        selectFromResult: ({ data }) => ({
            isCurrentUser: currentUser.username === username,
            profileUser: data,
        }),
    });

    const createdAt = formatDate(profileUser?.createdAt, {
        year: "numeric",
        month: "long",
    });
    const isFollowed =
        !isCurrentUser && profileUser?.followers.includes(currentUser.id);

    const handleTabData = (data) => {
        setTabData({ length: data.length });
    };

    const openEditModal = () => setEditModal(true);
    const closeEditModal = () => setEditModal(false);

    return (
        <main>
            {isCurrentUser && (
                <EditProfile
                    isOpen={editModal}
                    closeModal={closeEditModal}
                    user={profileUser}
                />
            )}

            <div
                className="column"
                id="general"
            >
                {profileUser ? (
                    <>
                        <ColumnHeader routerBack={true}>
                            <div className="profile-summary">
                                <h1>{profileUser.displayName}</h1>

                                {!!tabData?.length && <p>{tabData.length} Tweets</p>}
                                {/* {currentTab === "tweets" && <p>{tweets.length} Tweets</p>}
                                {currentTab === "replies" && <p>{replies.length} Tweets</p>}
                                {currentTab === "media" && <p>{media.length} Photos & videos</p>}
                                {currentTab === "likes" && <p>{likes.length} Likes</p>} */}
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
                                        alt="User PFP"
                                    />
                                </div>
                            </div>

                            {isCurrentUser ? (
                                <div className="options-container">
                                    <button
                                        className="edit btn-empty"
                                        onClick={openEditModal}
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            ) : (
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
                                            <BiEnvelope size="16" />
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
                                        />
                                    </div>
                                </IconContext.Provider>
                            )}

                            <div className="info-container">
                                <h1 className="displayName">
                                    {profileUser.displayName}
                                </h1>
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
                                        <span>{profileUser.following.length}</span>
                                        Following
                                    </Link>

                                    <Link
                                        to={`/${profileUser.username}/followers`}
                                        state={{ previousPath: pathname }}
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
                                tabs={["tweets", "replies", "media", "likes"]}
                                options={{
                                    options: { indexTab: "tweets" },
                                    index: `/${profileUser.username}`,
                                }}
                            />

                            <Outlet
                                context={{
                                    args: { id: profileUser?._id },
                                    options: { skip: !profileUser },
                                }}
                                handleChange={handleTabData}
                            />
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
