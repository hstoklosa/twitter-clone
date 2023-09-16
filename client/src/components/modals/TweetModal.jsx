import "../../styles/TweetModal.css";

import { ColumnHeader, TweetInput, BaseModal } from "../index";

const TweetModal = ({ isOpen, onClose }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            className="tweet-modal"
        >
            <ColumnHeader close={onClose} />
            <TweetInput forceExpand={true} />
        </BaseModal>
    );
};

export default TweetModal;
