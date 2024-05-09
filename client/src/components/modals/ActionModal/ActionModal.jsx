import "./styles.css";

import classNames from "classnames";
import { BaseModal } from "../../index";


const ActionModal = ({
    title,
    description,
    mainBtnLabel,
    focusOnMainBtn,
    mainBtnClassName,
    secondaryBtnLabel = "Cancel",
    secondaryBtnClassName,
    action,
    isOpen,
    closeModal
}) => {
    const handleAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
        action && action();
        closeModal();
    }

    const handleSecondaryAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    }

    const btnClasses = classNames(mainBtnClassName, {
        "action-focused": focusOnMainBtn
    });

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={closeModal}
            className="action-modal"
        >

            <div className="action-modal_content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>


            <div className="action-modal_btns">
                <button
                    className={btnClasses}
                    onClick={handleAction}
                >
                    {mainBtnLabel}
                </button>

                <button
                    className={secondaryBtnClassName}
                    onClick={handleSecondaryAction}
                >
                    {secondaryBtnLabel}
                </button>
            </div>

        </BaseModal>
    );
}

export default ActionModal;