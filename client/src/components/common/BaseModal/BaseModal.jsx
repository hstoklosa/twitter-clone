import "../../modals/SignupModal/styles.css";

import { useEffect } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";

const BaseModal = ({ isOpen, onClose, className, children }) => {
    const ref = useOutsideClick(onClose);

    useEffect(() => {
        isOpen
            ? (document.body.classList.add("modal-open"))
            : (document.body.classList.remove("modal-open"));

        return () => {
            document.body.classList.remove("modal-open");
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
