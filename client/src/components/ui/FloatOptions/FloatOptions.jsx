import "./styles.css";
import { useEffect } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";

const FloatOptions = ({ isOpen, onClose, className, children }) => {
    const ref = useOutsideClick(onClose);

    useEffect(() => {
        isOpen
            ? (document.body.classList.add("float-open"))
            : (document.body.classList.remove("float-open"));

        return () => document.body.classList.remove("float-open");
    }, [isOpen]);

    return (
        <>
            <div className="float-options_overlay" onClick={onClose}></div>

            <div
                className={`float-options ${className} ${isOpen && "open"}`}
                ref={ref}
            >
                {children}
            </div>
        </>
    );
};

export default FloatOptions;
