import logo from "../../assets/logo-white.png";

import { NavLink, useNavigate, useLocation } from "react-router-dom";

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

import { useLazySignOutQuery } from "../../store/api/authApi";
import { useGetUserInfoQuery } from "../../store/api/userApi";

const Sidebar = ({ minimal, currentUsername }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { username, displayName, profileImageURL } = useGetUserInfoQuery(currentUsername, {
        selectFromResult: ({ data }) => ({
            username: data?.username,
            displayName: data?.displayName,
            profileImageURL: data?.profileImageURL,
        }),
        skip: !currentUsername,
    });

    const [signOut] = useLazySignOutQuery();

    const handleSignOut = async () => {
        const result = await signOut();

        if (!result.isError) {
            navigate("/");
        }
    };

    return (
        <section
            className="column"
            id="navbar"
        >
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

                {minimal && (
                    <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                        <nav className="navbar">
                            <NavLink
                                to={`/explore`}
                                className="navbar-link current"
                                style={{ cursor: "not-allowed" }}
                            >
                                <BiSearch size="25" />
                                <span className="text">Explore</span>
                            </NavLink>

                            <NavLink
                                to={`/settings`}
                                className="navbar-link"
                            >
                                <BiCog size="25" />
                                <span className="text">Settings</span>
                            </NavLink>
                        </nav>
                    </IconContext.Provider>
                )}

                {!minimal && (
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
                                to={`/${username}`}
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
                            >
                                <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                    <PiDotsThreeCircle size="25" />
                                </IconContext.Provider>
                                <span className="text">More</span>
                            </button>

                            <button
                                type="button"
                                className="blue-btn navbar-btn"
                            >
                                <span className="text">Tweet</span>
                                <IconContext.Provider value={{ className: "navbar-btn_icon" }}>
                                    <FaFeatherAlt size="15" />
                                </IconContext.Provider>
                            </button>
                        </nav>
                    </IconContext.Provider>
                )}

                {!minimal && (
                    <>
                        <button className="navbar-account">
                            <div className="pfp-container">
                                <img
                                    src={profileImageURL}
                                    className="pfp"
                                    alt="User PFP"
                                />
                            </div>

                            <div className="navbar-account_names">
                                <p className="display_name">{displayName}</p>
                                <p className="username">@{username}</p>
                            </div>

                            <IconContext.Provider value={{ className: "navbar-account_icon" }}>
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
