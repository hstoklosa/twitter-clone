import classNames from "classnames";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IconContext } from "react-icons";
import { BiArrowBack } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import useScrollDirection from "../../../hooks/useScrollDirection";

import { useAppSelector, useAppDispatch } from "../../../app/store";
import { modalActions } from "../../../features/slices/modalSlice";
import { PfpContainer } from "../../index";

const ColumnHeader = ({
    className,
    sidebarButton = false,
    closeModal,
    modalBack,
    routerBack,
    children
}) => {
    const { user: currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");
    const scrollDirection = useScrollDirection();

    const headerClasses = classNames(className || "column-header", {
        scroll: scrollDirection === "down",
    });

    return (
        <IconContext.Provider value={{ className: "header-btn_icon" }}>
            <header className={headerClasses}>
                {(sidebarButton && isSmallDevice) && (
                    <div
                        className="mobile-sidebar_button"
                        onClick={() => dispatch(modalActions.enableMobileSidebar())}
                    >
                        <PfpContainer src={currentUser.profileImageURL} />
                    </div>
                )}

                {closeModal && (
                    <button
                        className="header-btn dark_round-btn"
                        onClick={() => dispatch(modalActions.closeModal())}
                        data-tooltip-id="action-tooltip"
                        data-tooltip-content="Close"
                    >
                        <div className="icon-container">
                            <IoMdClose
                                size="18"
                                className="icon"
                            />
                        </div>
                    </button>
                )}

                {modalBack && (
                    <button className="header-btn dark_round-btn">
                        <div className="icon-container">
                            <BiArrowBack
                                className="icon"
                                size="18"
                            />
                        </div>
                    </button>
                )}

                {routerBack && (
                    <Link
                        // to={state?.previousPath || "/home"}
                        to={-1}
                        className="header-btn dark_round-btn"
                        data-tooltip-id="action-tooltip"
                        data-tooltip-content="Back"
                    >
                        <div className="icon-container">
                            <BiArrowBack
                                className="icon"
                                size="18"
                            />
                        </div>
                    </Link>
                )}

                {children}
            </header>
        </IconContext.Provider>
    );
};

export default ColumnHeader;
