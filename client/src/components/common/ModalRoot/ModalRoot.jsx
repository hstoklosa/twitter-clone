import "./styles.css";

import { useAppSelector, useAppDispatch } from "../../../app/store";
import { modalActions } from "../../../features/slices/modalSlice";

import {
    TweetModal,
    ReplyModal,
    DisplayModal,
    MediaModal,
    EditProfile,
    LoginModal,
    SignupModal,
    ActionModal,
    VerificationModal,
    EditUsernameModal
} from "../../../components/modals/";


const MODAL_COMPONENTS = {
    'TweetModal': (props) => <TweetModal {...props} />,
    'ReplyModal': (props) => <ReplyModal {...props} />,
    'DisplayModal': (props) => <DisplayModal {...props} />,
    'MediaModal': (props) => <MediaModal {...props} />,
    'EditModal': (props) => <EditProfile {...props} />,
    'LoginModal': (props) => <LoginModal {...props} />,
    'RegisterModal': (props) => <SignupModal {...props} />,
    'ActionModal': (props) => <ActionModal {...props} />,
    'VerificationModal': (props) => <VerificationModal {...props} />,
    'EditUsernameModal': (props) => <EditUsernameModal {...props} />
}

const ModalRoot = () => {
    const dispatch = useAppDispatch();
    const { isOpen, componentName, componentProps } = useAppSelector((state) => state.modal);

    if (!isOpen) return;

    const render = MODAL_COMPONENTS[componentName];

    if (!render) {
        console.error(`Component not found.`);
        return null;
    }

    return render({
        isOpen,
        closeModal: () => dispatch(modalActions.closeModal()),
        ...componentProps
    });
};

export default ModalRoot;
