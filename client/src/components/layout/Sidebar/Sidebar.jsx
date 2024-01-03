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
} from "react-icons/bi";
import { FaFeatherAlt } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { PiDotsThreeCircle } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaEarthAmericas } from "react-icons/fa6";

import useModal from "../../../hooks/useModal";
import { useTheme } from "../../../contexts/ThemeProvider";
import { useAppSelector, useAppDispatch } from "../../../app/store";
import { authActions } from "../../../features/slices/authSlice";
import { useLazySignOutQuery } from "../../../features/api/authApi";

import { FloatOptions, TweetModal, Logo, DisplayModal } from "../../index";


const Sidebar = () => {
    const [tweetModal, setTweetModal] = useState(false);
    const [moreFloat, setMoreFloat] = useState(false);
    const [accountFloat, setAccountFloat] = useState(false);

    const { theme } = useTheme();

    const {
        isOpen: displayModal,
        open: openDisplayModal,
        close: closeDisplayModal
    } = useModal();

    const { user: currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [signOut] = useLazySignOutQuery();

    const openTweetModal = () => setTweetModal(true);
    const closeTweetModal = () => setTweetModal(false);
    const openAccountFloat = () => setAccountFloat(true);
    const closeAccountFloat = () => setAccountFloat(false);
    const openMoreFloat = () => setMoreFloat(true);
    const closeMoreFloat = () => {
        setMoreFloat(false);
    };

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
            {tweetModal && (
                <TweetModal
                    isOpen={tweetModal}
                    onClose={closeTweetModal}
                />
            )}

            {displayModal && (
                <DisplayModal
                    isOpen={displayModal}
                    onClose={closeDisplayModal}
                />
            )}

            <div className="sticky-wrapper">
                <NavLink
                    to={`/`}
                    className="logo-container"
                >
                    <Logo />
                </NavLink>


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
                            disabled
                        />

                        <NavLink
                            to={`/messages`}
                            className="navbar-link"
                            children={({ isActive }) => (
                                <>
                                    {isActive ? (
                                        <BiSolidEnvelope size="25" />
                                    ) : (
                                        <BiEnvelope size="25" style={{ strokeWidth: "0" }} />
                                    )}
                                    <span className="text">Messages</span>
                                </>
                            )}
                            state={{ previousPath: pathname }}
                            disabled
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
                            className="navbar-link"
                            onClick={openMoreFloat}
                        >
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <PiDotsThreeCircle size="25" />
                            </IconContext.Provider>

                            <span className="text">More</span>

                            {moreFloat && (
                                <FloatOptions
                                    isOpen={moreFloat}
                                    onClose={closeMoreFloat}
                                    className="more-options"
                                >
                                    <Link
                                        to={`/explore/people`}
                                        className="float-btn"
                                    >
                                        <div className="wrapper">
                                            <FaEarthAmericas />
                                        </div>
                                        Connect
                                    </Link>

                                    <button
                                        type="button"
                                        className="float-btn"
                                        onClick={openDisplayModal}
                                    >
                                        <div className="wrapper">
                                            <HiOutlinePencilAlt style={{ strokeWidth: "2" }} />
                                        </div>

                                        Display
                                    </button>
                                </FloatOptions>
                            )}
                        </button>

                        <button
                            type="button"
                            className="accent-btn navbar-btn"
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
                                <div className="wrapper">
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
                                </div>

                                <IoMdCheckmark size="20" className="account-checkmark" />
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


                    <IoEllipsisHorizontal size="15" className="navbar-account_icon" />
                </button>
            </div>
        </section >
    );
};

export default Sidebar;
