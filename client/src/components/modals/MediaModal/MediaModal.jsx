import "./styles.css";

import { IoMdClose } from "react-icons/io";
import { BaseModal } from "../../index";

const MediaModal = ({ isOpen, closeMediaModal, mediaUrl }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={closeMediaModal}
            className="media-modal"
        >
            <div className="media-modal_content">
                <img
                    src={mediaUrl}
                    className="media-modal_media"
                    alt="Media"
                />


                <a
                    className="media-modal_link"
                    href={mediaUrl}
                    target="__blank"
                >
                    Open original
                </a>

            </div>

            <button
                className="media-modal_close dark_round-btn"
                onClick={closeMediaModal}
            >
                <div className="icon-container">
                    <IoMdClose
                        size="20"
                        className="icon"
                    />
                </div>
            </button>
        </BaseModal>
    )
}

export default MediaModal;