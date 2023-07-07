import logo from "../../assets/logo-white.png";

import { NavLink } from "react-router-dom";

import { IconContext } from "react-icons";
import { TbSettings } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { FaFeatherAlt } from "react-icons/fa";
import { BiSolidHomeCircle, BiEnvelope, BiBookmark } from "react-icons/bi";
import { IoNotificationsOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { PiDotsThreeCircle } from "react-icons/pi";

import { useAuth } from "../../context/AuthProvider";

const Sidebar = ({ minimal }) => {
    const { auth, signOut } = useAuth();

    const handleSignOut = () => signOut();

    return (
        <section className="column" id="navbar">
            <div className="sticky-wrapper">
                <NavLink to={`/`} className="logo-container">
                    <img src={logo} alt="Logo" />
                </NavLink>

                {minimal && (
                    <nav className="navbar">
                        <NavLink to={`/explore`} activeClassName="current" className="navbar-link current">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <FiSearch size="25" />
                            </IconContext.Provider>
                            <span className="text">Explore</span>
                        </NavLink>
                        <NavLink to={`/settings`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <TbSettings size="25" />
                            </IconContext.Provider>
                            <span className="text">Settings</span>
                        </NavLink>
                    </nav>
                )}

                {!minimal && (
                    <nav className="navbar">
                        <NavLink to={`/home`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <BiSolidHomeCircle size="25" />
                            </IconContext.Provider>
                            <span className="text">Home</span>
                        </NavLink>
                        <NavLink to={`/explore`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <FiSearch size="25" />
                            </IconContext.Provider>
                            <span className="text">Explore</span>
                        </NavLink>
                        <NavLink to={`/notifications`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <IoNotificationsOutline size="25" />
                            </IconContext.Provider>
                            <span className="text">Notifications</span>
                        </NavLink>
                        <NavLink to={`/messages`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <BiEnvelope size="25" />
                            </IconContext.Provider>
                            <span className="text">Messages</span>
                        </NavLink>
                        <NavLink to={`/bookmarks`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <BiBookmark size="25" />
                            </IconContext.Provider>
                            <span className="text">Bookmarks</span>
                        </NavLink>
                        <NavLink to={`/profile/{}`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <HiOutlineUser size="25" />
                            </IconContext.Provider>
                            <span className="text">Profile</span>
                        </NavLink>
                        <button type="button" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <PiDotsThreeCircle size="25" />
                            </IconContext.Provider>
                            <span className="text">More</span>
                        </button>
                        <button className="navbar-btn">
                            <span className="text">Tweet</span>
                            <IconContext.Provider value={{ className: "navbar-btn_icon" }}>
                                <FaFeatherAlt size="15" />
                            </IconContext.Provider>
                        </button>
                    </nav>
                )}

                {!minimal && (
                    <button className="navbar-account" onClick={handleSignOut}>
                        <img src={auth.profileImageURL} alt="User Image" />
                        <div className="navbar-account_names">
                            <p className="display_name">{auth.displayName}</p>
                            <p className="username">@{auth.username}</p>
                        </div>
                        <IconContext.Provider value={{ className: "navbar-account_icon" }}>
                            <IoEllipsisHorizontal size="15" />
                        </IconContext.Provider>
                    </button>
                )}
            </div>
        </section>
    );
};

export default Sidebar;
