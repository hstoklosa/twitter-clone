import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";

const ColumnHeader = ({ close, modalBack, routerBack, className, children }) => {
    const { state } = useLocation();

    return (
        <IconContext.Provider value={{ className: "header-btn_icon" }}>
            <header className={className}>
                {close && (
                    <button
                        className="header-btn"
                        onClick={close}
                    >
                        <IoMdClose size="18" />
                    </button>
                )}

                {modalBack && (
                    <button className="header-btn">
                        <BiArrowBack size="18" />
                    </button>
                )}

                {routerBack && (
                    <Link
                        to={state?.previousPath || "/home"}
                        className="header-btn"
                    >
                        <BiArrowBack size="18" />
                    </Link>
                )}

                {children}
            </header>
        </IconContext.Provider>
    );
};

export default ColumnHeader;
