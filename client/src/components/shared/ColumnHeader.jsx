import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";

const ColumnHeader = ({ close, modalBack, routerBack, className, children }) => {
    const { state } = useLocation();

    return (
        <header className={className}>
            {close && (
                <button
                    className="header-btn"
                    onClick={close}
                >
                    <IconContext.Provider value={{ className: "header-btn_icon" }}>
                        <IoMdClose size="18" />
                    </IconContext.Provider>
                </button>
            )}

            {modalBack && (
                <button className="header-btn">
                    <IconContext.Provider value={{ className: "header-btn_icon" }}>
                        <BiArrowBack size="18" />
                    </IconContext.Provider>
                </button>
            )}

            {routerBack && (
                <Link
                    to={state?.previousPath || "/home"}
                    className="header-btn"
                >
                    <IconContext.Provider value={{ className: "header-btn_icon" }}>
                        <BiArrowBack size="18" />
                    </IconContext.Provider>
                </Link>
            )}

            {children}
        </header>
    );
};

export default ColumnHeader;
