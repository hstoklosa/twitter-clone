import "./styles.css";

import useOutsideClick from "../../../hooks/useOutsideClick";

const FloatOptions = ({ isOpen, onClose, children }) => {
    const ref = useOutsideClick(onClose);

    return (
        <div
            className={`float-options ${isOpen && "open"}`}
            onClick={(e) => e.preventDefault()}
            ref={ref}
        >
            {/* <div
                className="float-options-overlay"
                onClick={(e) => e.preventDefault()}
            ></div> */}
            {children}
        </div>
    );
};

export default FloatOptions;
