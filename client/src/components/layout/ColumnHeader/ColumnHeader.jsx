import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IconContext } from "react-icons";
import { BiArrowBack } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { MobileSidebar } from "../../index";

const ColumnHeader = ({
    className,
    sidebarButton = false,
    close,
    modalBack,
    routerBack,
    children
}) => {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");
    const { state } = useLocation();

    return (
        <IconContext.Provider value={{ className: "header-btn_icon" }}>
            <header className={className}>
                {(sidebarButton && isSmallDevice) && (
                    <MobileSidebar />
                )}

                {close && (
                    <button
                        className="header-btn dark_round-btn"
                        onClick={close}
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
                        to={state?.previousPath || "/home"}
                        className="header-btn dark_round-btn"
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
