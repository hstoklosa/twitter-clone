import "./styles.css";

import classNames from "classnames";
import { NavLink, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import {
    BiHomeCircle,
    BiSolidHomeCircle,
    BiSearch,
    BiBell,
    BiSolidBell,
    BiEnvelope,
    BiSolidEnvelope
} from "react-icons/bi";
import { FaFeatherAlt } from "react-icons/fa";

import useScrollDirection from "../../../hooks/useScrollDirection";

import { useAppDispatch } from "../../../app/store";
import { modalActions } from "../../../features/slices/modalSlice";


const MobileNavbar = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const scrollDirection = useScrollDirection();

    const navbarClasses = classNames("mobile-navbar", {
        scroll: scrollDirection === "down",
    });

    return (
        <div className={navbarClasses}>
            <NavLink
                to={`/home`}
                className="navbar-link"
                children={({ isActive }) => (
                    <>
                        {isActive ? (
                            <BiSolidHomeCircle size="23" />
                        ) : (
                            <BiHomeCircle size="23" />
                        )}
                    </>
                )}
                state={{ previousPath: pathname }}
            />

            <NavLink
                to={`/explore`}
                className="navbar-link"
                children={({ isActive }) => (
                    <>
                        <BiSearch size="23" />
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
                            <BiSolidBell size="23" />
                        ) : (
                            <BiBell size="23" />
                        )}
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
                            <BiSolidEnvelope size="23" />
                        ) : (
                            <BiEnvelope size="23" />
                        )}
                    </>
                )}
                state={{ previousPath: pathname }}
                disabled
            />

            <button
                type="button"
                className="accent-btn navbar-btn"
                onClick={() => dispatch(
                    modalActions.openModal({ name: "TweetModal" })
                )}
            >
                <IconContext.Provider
                    value={{ className: "navbar-btn_icon" }}
                >
                    <FaFeatherAlt size="15" />
                </IconContext.Provider>
            </button>
        </div>
    )
}

export default MobileNavbar;