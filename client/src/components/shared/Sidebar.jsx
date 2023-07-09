import logo from "../../assets/logo-white.png";

import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/authSlice";

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

const Sidebar = ({ minimal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleSignOut = async () => {
        const result = await dispatch(signOut());

        if (result.error) {
            return;
        }

        // event handler navigation
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
                        <NavLink to={`/explore`} activeClassName="current" className="navbar-link current">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <BiSearch size="25" />
                            </IconContext.Provider>
                            <span className="text">Explore</span>
                        </NavLink>
                        <NavLink to={`/settings`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <BiCog size="25" />
                            </IconContext.Provider>
                            <span className="text">Settings</span>
                        </NavLink>
                    </nav>
                )}

                {!minimal && (
                    <nav className="navbar">
                        <NavLink to={`/home`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <BiHomeCircle size="25" />
                            </IconContext.Provider>
                            <span className="text">Home</span>
                        </NavLink>
                        <NavLink to={`/explore`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <BiSearch size="25" />
                            </IconContext.Provider>
                            <span className="text">Explore</span>
                        </NavLink>
                        <NavLink to={`/notifications`} activeClassName="current" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <BiBell size="25" />
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
                                <BiUser size="25" />
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
                        <img src={user?.profileImageURL} alt="User Image" />
                        <div className="navbar-account_names">
                            <p className="display_name">{user?.displayName}</p>
                            <p className="username">@{user?.username}</p>
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
