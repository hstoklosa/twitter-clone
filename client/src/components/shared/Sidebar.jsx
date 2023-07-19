import logo from "../../assets/logo-white.png";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IconContext } from "react-icons";
import { FaFeatherAlt } from "react-icons/fa";
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
import { IoEllipsisHorizontal } from "react-icons/io5";
import { PiDotsThreeCircle } from "react-icons/pi";

import { FloatOptions } from "../index";
import { signOut } from "../../slices/authSlice";

const Sidebar = ({ minimal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [accountFloat, setAccountFloat] = useState(false);

    const openAccountFloat = () => setAccountFloat(true);
    const closeAccountFloat = () => setAccountFloat(false);

    const handleSignOut = async () => {
        const result = await dispatch(signOut());

        if (result.error) {
            return;
        }

        // event handler navigation
        closeAccountFloat();
        navigate("/");
        return;
    };

    return (
        <section className="column" id="navbar">
            <div className="sticky-wrapper">
                <NavLink to={`/`} className="logo-container">
                    <img src={logo} alt="Logo" />
                </NavLink>

                {minimal && (
                    <nav className="navbar">
                        <NavLink to={`/explore`} className="navbar-link current" style={{ cursor: "not-allowed" }}>
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <BiSearch size="25" />
                            </IconContext.Provider>
                            <span className="text">Explore</span>
                        </NavLink>
                        <NavLink to={`/settings`} className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <BiCog size="25" />
                            </IconContext.Provider>
                            <span className="text">Settings</span>
                        </NavLink>
                    </nav>
                )}

                {!minimal && (
                    <nav className="navbar">
                        <NavLink
                            to={`/home`}
                            className="navbar-link"
                            children={({ isActive }) => (
                                <>
                                    <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                        {isActive ? <BiSolidHomeCircle size="25" /> : <BiHomeCircle size="25" />}
                                    </IconContext.Provider>
                                    <span className="text">Home</span>
                                </>
                            )}
                        />
                        <NavLink
                            to={`/explore`}
                            className="navbar-link"
                            children={({ isActive }) => (
                                <>
                                    <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                        <BiSearch size="25" />
                                    </IconContext.Provider>
                                    <span className="text">Explore</span>
                                </>
                            )}
                        />
                        <NavLink
                            to={`/notifications`}
                            className="navbar-link"
                            children={({ isActive }) => (
                                <>
                                    <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                        {isActive ? <BiSolidBell size="25" /> : <BiBell size="25" />}
                                    </IconContext.Provider>
                                    <span className="text">Notifications</span>
                                </>
                            )}
                        />
                        <NavLink
                            to={`/messages`}
                            className="navbar-link"
                            children={({ isActive }) => (
                                <>
                                    <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                        {isActive ? <BiSolidEnvelope size="25" /> : <BiEnvelope size="25" />}
                                    </IconContext.Provider>
                                    <span className="text">Messages</span>
                                </>
                            )}
                        />
                        <NavLink
                            to={`/bookmarks`}
                            className="navbar-link"
                            children={({ isActive }) => (
                                <>
                                    <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                        {isActive ? <BiSolidBookmark size="25" /> : <BiBookmark size="25" />}
                                    </IconContext.Provider>
                                    <span className="text">Bookmarks</span>
                                </>
                            )}
                        />
                        <NavLink
                            to={`/${user.username}`}
                            className="navbar-link"
                            children={({ isActive }) => (
                                <>
                                    <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                        {isActive ? <BiSolidUser size="25" /> : <BiUser size="25" />}
                                    </IconContext.Provider>
                                    <span className="text">Profile</span>
                                </>
                            )}
                        />

                        <button type="button" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <PiDotsThreeCircle size="25" />
                            </IconContext.Provider>
                            <span className="text">More</span>
                        </button>

                        <button type="button" className="blue-btn navbar-btn">
                            <span className="text">Tweet</span>
                            <IconContext.Provider value={{ className: "navbar-btn_icon" }}>
                                <FaFeatherAlt size="15" />
                            </IconContext.Provider>
                        </button>
                    </nav>
                )}

                {!minimal && (
                    <>
                        {accountFloat && (
                            <FloatOptions isOpen={accountFloat} onClose={closeAccountFloat} className="account-settings">
                                <button type="button" className="more-btn" onClick={handleSignOut}>
                                    Log out @{user.username}
                                </button>
                            </FloatOptions>
                        )}
                        <button className="navbar-account" onClick={openAccountFloat}>
                            <div className="pfp-container">
                                <img src={user?.profileImageURL} className="pfp" alt="User PFP" />
                            </div>

                            <div className="navbar-account_names">
                                <p className="display_name">{user?.displayName}</p>
                                <p className="username">@{user?.username}</p>
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
