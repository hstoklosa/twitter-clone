import "./styles.css"
import { useState } from "react";
import ReactDOMServer from 'react-dom/server';

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
import { IoEllipsisHorizontal, IoEarthOutline } from "react-icons/io5";
import { PiDotsThreeCircle } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
// import { FaEarthAmericas } from "react-icons/fa6";

import useModal from "../../../hooks/useModal";

import { useAppSelector, useAppDispatch } from "../../../app/store";
import { modalActions } from "../../../features/slices/modalSlice";
import { authActions } from "../../../features/slices/authSlice";
import { useLazySignOutQuery } from "../../../features/api/authApi";

import { Float, Logo, PfpContainer } from "../../index";


const Sidebar = () => {
    const { user: currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const {
        isOpen: isAccountFloatOpen,
        open: openAccountFloat,
        close: closeAccountFloat
    } = useModal();

    const {
        isOpen: isMoreFloatOpen,
        open: openMoreFloat,
        close: closeMoreFloat
    } = useModal();

    const [signOut] = useLazySignOutQuery();


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
            <div className="sticky-wrapper">
                <div className="dark_round-btn sidebar-logo">
                    <NavLink
                        to={`/home`}
                        className="logo-container icon-container"
                        state={{ previousPath: pathname }}
                    >
                        <Logo />
                    </NavLink>

                </div>

                <IconContext.Provider value={{ className: "navbar_icon" }}>
                    <nav className="navbar">
                        <NavLink
                            to={`/home`}
                            className="navbar-link"
                            children={({ isActive }) => (
                                <>
                                    <div className="navbar-link_container">
                                        {isActive ? (
                                            <BiSolidHomeCircle />
                                        ) : (
                                            <BiHomeCircle />
                                        )}
                                    </div>
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
                                    <div className="navbar-link_container">
                                        <BiSearch />
                                    </div>
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
                                    <div className="navbar-link_container">
                                        {isActive ? (
                                            <BiSolidBell />
                                        ) : (
                                            <BiBell />
                                        )}
                                    </div>
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
                                    <div className="navbar-link_container">
                                        {isActive ? (
                                            <BiSolidEnvelope />
                                        ) : (
                                            <BiEnvelope />
                                        )}
                                    </div>
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
                                    <div className="navbar-link_container">
                                        {isActive ? <BiSolidBookmark /> : <BiBookmark />}
                                    </div>
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
                                    <div className="navbar-link_container">
                                        {isActive ? (
                                            <BiSolidUser />
                                        ) : (
                                            <BiUser />
                                        )}
                                    </div>
                                    <span className="text">Profile</span>
                                </>
                            )}
                            state={{ previousPath: pathname }}
                        />

                        <Float
                            isOpen={isMoreFloatOpen}
                            open={openMoreFloat}
                            close={closeMoreFloat}
                            // defaultPositions={["bottom", "right"]}
                            className="more-options"
                            renderContent={() => (
                                <div className="more-options">
                                    <Link
                                        to={`/explore/people`}
                                        className="float-btn"
                                    >
                                        <div className="wrapper">
                                            <IoEarthOutline style={{ strokeWidth: "7" }} />
                                        </div>
                                        Connect
                                    </Link>

                                    <button
                                        type="button"
                                        className="float-btn"
                                        onClick={() => dispatch(
                                            modalActions.openModal({
                                                name: "DisplayModal"
                                            })
                                        )}
                                    >
                                        <div className="wrapper">
                                            <HiOutlinePencilAlt style={{ strokeWidth: "2" }} />
                                        </div>

                                        Display
                                    </button>
                                </div>
                            )}
                        >
                            <button
                                type="button"
                                className="navbar-link"
                                onClick={openMoreFloat}
                            >
                                <IconContext.Provider value={{ className: "navbar_icon settings" }}>
                                    <PiDotsThreeCircle size="25" style={{ strokeWidth: "2" }} />
                                </IconContext.Provider>

                                <span className="text">More</span>
                            </button>
                        </Float>

                        <button
                            type="button"
                            className="accent-btn navbar-btn"
                            onClick={() => dispatch(modalActions.openModal({
                                name: "TweetModal"
                            }))}
                        >
                            <span className="text">Post</span>
                            <IconContext.Provider
                                value={{ className: "navbar-btn_icon" }}
                            >
                                <FaFeatherAlt size="15" />
                            </IconContext.Provider>
                        </button>
                    </nav>
                </IconContext.Provider>

                <Float
                    isOpen={isAccountFloatOpen}
                    open={openAccountFloat}
                    close={closeAccountFloat}
                    className="account-settings"
                    renderContent={({ floatRef }) => (
                        <>
                            <section className="account-details" ref={floatRef}>
                                <div className="wrapper truncate">
                                    <PfpContainer src={currentUser.profileImageURL} />

                                    <div className="navbar-account_names truncate">
                                        <p className="display_name truncate">
                                            {currentUser.displayName}
                                        </p>
                                        <p className="username truncate">
                                            @{currentUser.username}
                                        </p>
                                    </div>
                                </div>

                                <IoMdCheckmark
                                    size="20"
                                    className="account-checkmark"
                                />
                            </section>

                            <button
                                type="button"
                                className="float-btn"
                                onClick={handleSignOut}
                            >
                                Log out @{currentUser.username}
                            </button>
                        </>
                    )}
                >
                    <button
                        className="navbar-account"
                        onClick={openAccountFloat}
                    >
                        <PfpContainer src={currentUser.profileImageURL} />


                        <div className="navbar-account_names truncate">
                            <p className="display_name truncate">
                                {currentUser.displayName}
                            </p>
                            <p className="username truncate">
                                @{currentUser.username}
                            </p>
                        </div>

                        <IoEllipsisHorizontal
                            size="16"
                            className="navbar-account_icon"
                        />
                    </button>
                </Float>
            </div>
        </section >
    );
};

export default Sidebar;
