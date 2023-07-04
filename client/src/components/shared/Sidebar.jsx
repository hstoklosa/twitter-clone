import logo from "../../assets/logo-white.png";
import elon from "../../assets/elon.jpg";

import { IconContext } from "react-icons";
import { TbSettings } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { FaFeatherAlt } from "react-icons/fa";
import { BiSolidHomeCircle, BiEnvelope, BiBookmark } from "react-icons/bi";
import { IoNotificationsOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { PiDotsThreeCircle } from "react-icons/pi";

const Sidebar = ({ minimal }) => {
    return (
        <section className="column" id="navbar">
            <div className="sticky-wrapper">
                <a href="/" className="logo-container">
                    <img src={logo} alt="Logo" />
                </a>

                {minimal && (
                    <nav className="navbar">
                        <a href="https://twitter.com/" className="navbar-link current">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <FiSearch size="25" />
                            </IconContext.Provider>
                            <span className="text">Explore</span>
                        </a>
                        <a href="https://twitter.com/" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <TbSettings size="25" />
                            </IconContext.Provider>
                            <span className="text">Settings</span>
                        </a>
                    </nav>
                )}

                {!minimal && (
                    <nav className="navbar">
                        <a href="https://twitter.com/" className="navbar-link current">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <BiSolidHomeCircle size="25" />
                            </IconContext.Provider>
                            <span className="text">Home</span>
                        </a>
                        <a href="https://twitter.com/" className="navbar-link current">
                            <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                                <FiSearch size="25" />
                            </IconContext.Provider>
                            <span className="text">Explore</span>
                        </a>
                        <a href="https://twitter.com/" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <IoNotificationsOutline size="25" />
                            </IconContext.Provider>
                            <span className="text">Notifications</span>
                        </a>
                        <a href="https://twitter.com/" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <BiEnvelope size="25" />
                            </IconContext.Provider>
                            <span className="text">Messages</span>
                        </a>
                        <a href="https://twitter.com/" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <BiBookmark size="25" />
                            </IconContext.Provider>
                            <span className="text">Bookmarks</span>
                        </a>
                        <a href="https://twitter.com/" className="navbar-link">
                            <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                <HiOutlineUser size="25" />
                            </IconContext.Provider>
                            <span className="text">Profile</span>
                        </a>
                        <button className="navbar-link">
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
                    <button className="navbar-account">
                        <img src={elon} alt="User Image" />
                        <div className="navbar-account_names">
                            <p className="display_name">Elon Musk</p>
                            <p className="username">@elonmusk</p>
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
