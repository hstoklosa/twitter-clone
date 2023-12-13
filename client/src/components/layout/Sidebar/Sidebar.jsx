import logo from "../../../assets/logo-white.png";

import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import { IconContext } from "react-icons";
import {
    BiSearch,
    BiHomeCircle,
    BiSolidHomeCircle,
    BiEnvelope,
    BiSolidEnvelope,
    BiBookmark,
    BiSolidBookmark,
    BiBell,
    BiSolidBell,
    BiUser,
    BiSolidUser,
    BiCog,
} from "react-icons/bi";
import { FaFeatherAlt } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { PiDotsThreeCircle } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";

import { useAppSelector, useAppDispatch } from "../../../app/store";
import { authActions } from "../../../features/slices/authSlice";
import { useLazySignOutQuery } from "../../../features/api/authApi";

import { FloatOptions, TweetModal } from "../../index";

const Sidebar = () => {
    const { isAuth, user: currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [tweetModal, setTweetModal] = useState(false);
    const [accountFloat, setAccountFloat] = useState(false);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [signOut] = useLazySignOutQuery();

    const openTweetModal = () => setTweetModal(true);
    const closeTweetModal = () => setTweetModal(false);
    const openAccountFloat = () => setAccountFloat(true);
    const closeAccountFloat = () => setAccountFloat(false);

    const handleSignOut = async () => {
        const result = await signOut();

        if (!result.isError) {
            dispatch(authActions.signOut());
            closeAccountFloat();
            navigate("/");
        }
    };

    return (
        <section
            className="column"
            id="navbar"
        >
            {isAuth && (
                <TweetModal
                    isOpen={tweetModal}
                    onClose={closeTweetModal}
                />
            )}

            <div className="sticky-wrapper">
                <NavLink
                    to={`/`}
                    className="logo-container"
                >
                    <img
                        src={logo}
                        alt="Logo"
                    />
                </NavLink>

                {!isAuth && (
                    <IconContext.Provider
                        value={{ className: "navbar_icon explore" }}
                    >
                        <nav className="navbar">
                            <button className="navbar-link">
                                <BiSearch
                                    size="25"
                                    style={{ strokeWidth: "0.75px" }}
                                />
                                <span className="text">Explore</span>
                            </button>

                            <button
                                className="navbar-link"
                                disabled
                            >
                                <BiCog size="25" />
                                <span className="text">Settings</span>
                            </button>
                        </nav>
                    </IconContext.Provider>
                )}

                {isAuth && (
                    <IconContext.Provider value={{ className: "navbar_icon" }}>
                        <nav className="navbar">
                            <NavLink
                                to={`/home`}
                                className="navbar-link"
                                children={({ isActive }) => (
                                    <>
                                        {isActive ? (
                                            <BiSolidHomeCircle size="25" />
                                        ) : (
                                            <BiHomeCircle size="25" />
                                        )}
                                        <span className="text">Home</span>
                                    </>
                                )}
                                state={{ previousPath: pathname }}
                            />

                            <NavLink
                                to={`/explore`}
                                className="navbar-link"
                                children={({ isActive }) => (
                                    <>
                                        <BiSearch size="25" />
                                        <span className="text">Explore</span>
                                    </>
                                )}
                                state={{ previousPath: pathname }}
                            />

                            <NavLink
                                to={`/notifications`}
                                className="navbar-link"
                                children={({ isActive }) => (
                                    <>
                                        {isActive ? (
                                            <BiSolidBell size="25" />
                                        ) : (
                                            <BiBell size="25" />
                                        )}
                                        <span className="text">Notifications</span>
                                    </>
                                )}
                                state={{ previousPath: pathname }}
                            />

                            <NavLink
                                to={`/messages`}
                                className="navbar-link"
                                children={({ isActive }) => (
                                    <>
                                        {isActive ? (
                                            <BiSolidEnvelope size="25" />
                                        ) : (
                                            <BiEnvelope size="25" />
                                        )}
                                        <span className="text">Messages</span>
                                    </>
                                )}
                                state={{ previousPath: pathname }}
                            />

                            <NavLink
                                to={`/bookmarks`}
                                className="navbar-link"
                                children={({ isActive }) => (
                                    <>
                                        {isActive ? (
                                            <BiSolidBookmark size="25" />
                                        ) : (
                                            <BiBookmark size="25" />
                                        )}
                                        <span className="text">Bookmarks</span>
                                    </>
                                )}
                                state={{ previousPath: pathname }}
                            />

                            <NavLink
                                to={`/${currentUser.username}`}
                                className="navbar-link"
                                children={({ isActive }) => (
                                    <>
                                        {isActive ? (
                                            <BiSolidUser size="25" />
                                        ) : (
                                            <BiUser size="25" />
                                        )}
                                        <span className="text">Profile</span>
                                    </>
                                )}
                                state={{ previousPath: pathname }}
                            />

                            <button
                                type="button"
                                className="blue-btn navbar-btn"
                                onClick={openTweetModal}
                            >
                                <span className="text">Tweet</span>
                                <IconContext.Provider
                                    value={{ className: "navbar-btn_icon" }}
                                >
                                    <FaFeatherAlt size="15" />
                                </IconContext.Provider>
                            </button>
                        </nav>
                    </IconContext.Provider>
                )}

                {isAuth && (
                    <>
                        <button
                            className="navbar-account"
                            onClick={openAccountFloat}
                        >
                            {accountFloat && (
                                <FloatOptions
                                    isOpen={accountFloat}
                                    onClose={closeAccountFloat}
                                    className="account-settings"
                                >
                                    <section className="account-details">
                                        <div className="pfp-container">
                                            <img
                                                src={currentUser.profileImageURL}
                                                className="pfp"
                                                alt="User PFP"
                                            />
                                        </div>

                                        <div className="navbar-account_names">
                                            <p className="display_name">
                                                {currentUser.displayName}
                                            </p>
                                            <p className="username">
                                                @{currentUser.username}
                                            </p>
                                        </div>
                                        <IoMdCheckmark />
                                    </section>
                                    <button
                                        type="button"
                                        className="float-btn"
                                        onClick={handleSignOut}
                                    >
                                        Log out @{currentUser.username}
                                    </button>
                                </FloatOptions>
                            )}

                            <div className="pfp-container">
                                <img
                                    src={currentUser.profileImageURL}
                                    className="pfp"
                                    alt="User PFP"
                                />
                            </div>

                            <div className="navbar-account_names">
                                <p className="display_name">
                                    {currentUser.displayName}
                                </p>
                                <p className="username">@{currentUser.username}</p>
                            </div>

                            <IconContext.Provider
                                value={{ className: "navbar-account_icon" }}
                            >
                                <IoEllipsisHorizontal size="15" />
                            </IconContext.Provider>
                        </button>
                    </>
                )}
            </div>
        </section>
    );
};

export default Sidebar;
