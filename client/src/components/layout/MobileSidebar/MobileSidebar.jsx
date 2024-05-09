import "./styles.css";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
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
import { TbLogout } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";

import useOutsideClick from "../../../hooks/useOutsideClick";

import { useAppSelector, useAppDispatch } from "../../../app/store";
import { useLazySignOutQuery } from "../../../features/api/authApi";
import { authActions } from "../../../features/slices/authSlice";
import { modalActions } from "../../../features/slices/modalSlice";

import { PfpContainer } from "../../index";

const stateSelector = createSelector(
    (state) => state.modal,
    (state) => state.auth,
    (modal, auth) => ({
        currentUser: auth.user,
        mobileSidebar: modal.mobileSidebar
    })
);

const MobileSidebar = () => {
    const { currentUser, mobileSidebar } = useAppSelector(stateSelector);
    const dispatch = useAppDispatch();

    const ref = useOutsideClick(() => dispatch(modalActions.disableMobileSidebar()));

    const { pathname } = useLocation();
    const navigate = useNavigate();


    const [signOut] = useLazySignOutQuery();

    const onNavClick = () => {
        dispatch(modalActions.disableMobileSidebar());
    }

    const handleSignOut = async () => {
        const result = await signOut();

        if (!result.isError) {
            dispatch(authActions.signOut());
            navigate("/");
        }
    };

    return (
        <div className={`mobile-sidebar ${mobileSidebar ? "open" : ""}`}>
            <div className={`mobile-sidebar_content`} ref={ref}>
                <div className="user-info">
                    <Link
                        to={`/${currentUser.username}`}
                        onClick={onNavClick}
                    >
                        <PfpContainer src={currentUser.profileImageURL} />
                    </Link>

                    <div className="details-container truncate">
                        <Link
                            to={`/${currentUser.username}`}
                            onClick={onNavClick}
                            className="display_name truncate"
                        >
                            {currentUser.displayName}
                        </Link>

                        <Link
                            to={`/${currentUser.username}`}
                            onClick={onNavClick}
                            className="username truncate"
                        >
                            @{currentUser.username}
                        </Link>
                    </div>


                    <div className="follow-links">
                        <Link
                            to={`/${currentUser.username}/following`}
                            state={{ previousPath: pathname }}
                            onClick={onNavClick}
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
                            onClick={onNavClick}
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
                            onClick={onNavClick}
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
                            onClick={onNavClick}
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
                            onClick={onNavClick}
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
                            onClick={onNavClick}
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
                            onClick={onNavClick}
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
                            onClick={onNavClick}
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
                            onClick={() => {
                                onNavClick();
                                dispatch(modalActions.openModal({
                                    name: "DisplayModal"
                                }));
                            }}
                        >
                            <HiOutlinePencilAlt
                                size="25"
                                style={{ strokeWidth: "2px" }}
                            />

                            <span className="text">Display</span>
                        </button>

                        <button
                            type="button"
                            className="navbar-link"
                            onClick={() => {
                                onNavClick();
                                handleSignOut();
                            }}
                        >
                            <TbLogout
                                size="25"
                                style={{ strokeWidth: "2px" }}
                            />

                            <span className="text">Log out</span>
                        </button>
                    </nav>
                </IconContext.Provider>
            </div>
        </div>
    )

}

export default MobileSidebar;
