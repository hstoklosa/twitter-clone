import "./styles.css";

import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import {
    BiHomeCircle,
    BiSolidHomeCircle,
    BiSearch,
    BiBell,
    BiSolidBell,
    BiEnvelope,
    BiSolidEnvelope,
    BiBookmark,
    BiSolidBookmark,
    BiUser,
    BiSolidUser,
} from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";

import useModal from "../../../hooks/useModal";
import useOutsideClick from "../../../hooks/useOutsideClick";

import { useAppSelector, useAppDispatch } from "../../../app/store";
import { useLazySignOutQuery } from "../../../features/api/authApi";
import { authActions } from "../../../features/slices/authSlice";

import { DisplayModal } from "../../index";

const MobileSidebar = ({ }) => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        isOpen: displayModal,
        open: openDisplayModal,
        close: closeDisplayModal
    } = useModal();
    const ref = useOutsideClick(() => setIsOpen(false));

    const dispatch = useAppDispatch();
    const { user: currentUser } = useAppSelector((state) => state.auth);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [signOut] = useLazySignOutQuery();

    const handleSignOut = async () => {
        const result = await signOut();

        if (!result.isError) {
            dispatch(authActions.signOut());
            navigate("/");
        }
    };

    return (
        <div className={`mobile-sidebar ${isOpen ? "open" : ""}`}>
            {displayModal && (
                <DisplayModal
                    isOpen={displayModal}
                    onClose={closeDisplayModal}
                />
            )}

            <div className="mobile-sidebar_button" onClick={() => setIsOpen(true)}>
                <div className="pfp-container">
                    <img
                        src={currentUser.profileImageURL}
                        className="pfp"
                        alt="User Pfp"
                    />
                </div>
            </div>

            <div className={`mobile-sidebar_content`} ref={ref}>
                <div className="user-info">
                    <Link to={`/${currentUser.username}`}>
                        <div className="pfp-container">
                            <img
                                src={currentUser.profileImageURL}
                                className="pfp"
                                alt="User Pfp"
                            />
                        </div>
                    </Link>


                    <div className="details-container">
                        <p className="display_name">{currentUser.displayName}</p>
                        <p className="username">@{currentUser.username}</p>
                    </div>


                    <div className="follow-links">
                        <Link
                            to={`/${currentUser.username}/following`}
                            state={{ previousPath: pathname }}
                            className="count"
                        >
                            <span>
                                {currentUser.following.length}
                            </span>
                            Following
                        </Link>

                        <Link
                            to={`/${currentUser.username}/followers`}
                            state={{ previousPath: pathname }}
                            className="count"
                        >
                            <span>
                                {currentUser.followers.length}
                            </span>
                            Followers
                        </Link>
                    </div>
                </div>

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
                                        <BiEnvelope size="25" />
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
                            to={`/${currentUser.username} `}
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
                            onClick={openDisplayModal}
                        >

                            <HiOutlinePencilAlt size="25" style={{ strokeWidth: "2px" }} />

                            <span className="text">Display</span>

                        </button>

                    </nav>
                </IconContext.Provider>

                <button
                    className="navbar-account"
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


                </button>
            </div>
        </div>
    )

}

export default MobileSidebar;
