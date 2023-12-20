import "./styles.css";
import useOutsideClick from "../../../hooks/useOutsideClick";

const FloatOptions = ({ isOpen, onClose, className, children }) => {
    const ref = useOutsideClick(onClose);

    return (
        <div
            className={`float-options ${className} ${isOpen && "open"}`}
            ref={ref}
        >
            {children}
        </div>
    );
};

export default FloatOptions;
