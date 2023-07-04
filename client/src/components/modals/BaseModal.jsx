import "../../styles/SignupModal.css";

import useOutsideClick from "../../hooks/useOutsideClick";

const BaseModal = ({ isOpen, onClose, children }) => {
    const ref = useOutsideClick(onClose);

    if (!isOpen) {
        return null;
    }

    document.body.style.overflow = "hidden";

    return (
        <div className={`modal ${isOpen ? `open` : ""}`}>
            <div className="modal-content" ref={ref}>
                {children}
            </div>
        </div>
    );
};

export default BaseModal;
