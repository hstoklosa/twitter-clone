import "../../modals/SignupModal/styles.css";

import { useEffect } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";

const BaseModal = ({ isOpen, onClose, className, children }) => {
    const ref = useOutsideClick(onClose);

    useEffect(() => {
        isOpen
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "unset");

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <div className={`modal ${isOpen && "open"} ${className}`}>
            <div className="modal-content_wrapper">
                <div
                    className="modal-content"
                    ref={ref}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
