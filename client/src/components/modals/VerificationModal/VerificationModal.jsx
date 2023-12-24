import "./styles.css";

import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

import { registerActions } from "../../../features/slices/registerSlice";
import { useAppSelector, useAppDispatch } from "../../../app/store";
import { useLazyVerifyTokenQuery } from "../../../features/api/authApi";

import { BaseModal, TextInput, Logo } from "../../index";
import { modalActions } from "../../../features/slices/modalSlice";


const VerificationModal = ({ isOpen, closeModal }) => {
    const { token } = useAppSelector((state) => state.register);
    const { userId } = useAppSelector((state) => state.modal.verificationModal);

    const dispatch = useAppDispatch();

    const [verifyToken, { error: verifyTokenError = false }] = useLazyVerifyTokenQuery();

    const handleVerification = async (e) => {
        e.preventDefault();

        const result = await verifyToken({
            id: userId,
            token,
        });


        if (result.error) {
            return toast.error(result.error.message);
        }

        if (result?.data?.isEmailVerified) {
            closeVerificationModal();
        }

    }

    const closeVerificationModal = () => {
        dispatch(registerActions.clearToken());
        dispatch(modalActions.disableVerificationModal());
    }

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={() => ({})}
            className="verification-modal"
        >
            <NavLink
                to={`/`}
                className="logo-container"
            >
                <Logo />
            </NavLink>
            <form
                className="verification-modal_form"
                onSubmit={handleVerification}
            >
                <div className="input-wrapper">
                    <h1>We sent you a code</h1>
                    <p>Enter it below to verify your email address</p>

                </div>

                <div className="input-wrapper">
                    <TextInput
                        type="text"
                        id="code"
                        name="code"
                        label="Verification code"
                        error={verifyTokenError}
                        value={token}
                        onChange={({ target }) => dispatch(
                            registerActions.updateToken({ value: target.value })
                        )}
                    />

                    <button
                        type="submit"
                        className="white-btn next"
                        disabled={!token}
                    >
                        Verify
                    </button>
                </div>
            </form>


        </BaseModal>
    );
}

export default VerificationModal;