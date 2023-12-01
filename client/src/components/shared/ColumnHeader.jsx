import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";

import { BiArrowBack } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const ColumnHeader = ({ close, modalBack, routerBack, className, children }) => {
    const { state } = useLocation();

    return (
        <IconContext.Provider value={{ className: "header-btn_icon" }}>
            <header className={className}>
                {close && (
                    <button
                        className="header-btn round-btn"
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
                    <button className="header-btn round-btn">
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
                        className="header-btn round-btn"
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
