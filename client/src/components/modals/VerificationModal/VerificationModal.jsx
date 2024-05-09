import "./styles.css";

import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAppSelector, useAppDispatch } from "../../../app/store";
import { useVerifyTokenMutation, useLazyCheckAuthQuery } from "../../../features/api/authApi";
import { registerActions } from "../../../features/slices/registerSlice";

import { BaseModal, TextInput, Logo } from "../../index";


const VerificationModal = ({ isOpen, closeModal }) => {
    const { token } = useAppSelector((state) => state.register);
    const { userId } = useAppSelector((state) => state.modal.componentProps);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [verifyToken, { error: verifyTokenError = false }] = useVerifyTokenMutation();
    const [checkAuth] = useLazyCheckAuthQuery();

    const handleVerification = async (e) => {
        e.preventDefault();

        const result = await verifyToken({
            id: userId,
            token,
        });


        if (result.error) {
            return toast.error(result.error.message);
        }

        if (result?.data?.isAuthenticated) {
            closeVerificationModal();
            // dispatch(checkAuth(undefined));
        }
    }

    const closeVerificationModal = () => {
        dispatch(registerActions.clearToken());
        closeModal();
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