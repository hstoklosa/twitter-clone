import logo from "../../assets/logo-white.png";
import elon from "../../assets/elon.jpg";

import { IconContext } from "react-icons";
import { TbSettings } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";

import { BiSolidHomeCircle, BiEnvelope, BiBookmark } from "react-icons/bi";
import { IoNotificationsOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { PiDotsThreeCircle } from "react-icons/pi";

const Sidebar = ({ minimal }) => {
    return (
        <section className="column" id="navbar">
            <a href="/" className="logo-container">
                <img src={logo} alt="Logo" />
            </a>

            {minimal && (
                <nav className="navbar">
                    <a href="https://twitter.com/" className="navbar-link current">
                        <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                            <FiSearch size="25" />
                        </IconContext.Provider>
                        Explore
                    </a>
                    <a href="https://twitter.com/" className="navbar-link">
                        <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                            <TbSettings size="25" />
                        </IconContext.Provider>
                        Settings
                    </a>
                </nav>
            )}

            {!minimal && (
                <nav className="navbar">
                    <a href="https://twitter.com/" className="navbar-link current">
                        <IconContext.Provider value={{ className: "navbar_icon explore" }}>
                            <FiSearch size="25" />
                        </IconContext.Provider>
                        Explore
                    </a>
                    <a href="https://twitter.com/" className="navbar-link">
                        <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                            <TbSettings size="25" />
                        </IconContext.Provider>
                        Settings
                    </a>
                </nav>
            )}
        </section>
    );
};

export default Sidebar;
