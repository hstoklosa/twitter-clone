import "../../styles/FloatOptions.css";

import useOutsideClick from "../../hooks/useOutsideClick";

const FloatOptions = ({ isOpen, onClose, children }) => {
    const ref = useOutsideClick(onClose);

    return (
        <div
            className={`float-options ${isOpen && "open"}`}
            ref={ref}
        >
            {children}
        </div>
    );
};

export default FloatOptions;
