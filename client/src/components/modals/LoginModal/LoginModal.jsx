import "./styles.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";

import { useAppSelector } from "../../../app/store";
import useModalPagination from "../../../hooks/useModalPagination";

import {
    useSignInMutation,
    useLazyIdentifierExistsQuery,
} from "../../../features/api/authApi";

import { modalActions } from "../../../features/slices/modalSlice";
import { loginActions } from "../../../features/slices/loginSlice";

import {
    BaseModal,
    ColumnHeader,
    TextInput,
    Logo
} from "../../index";


const LoginModal = ({ isOpen, closeModal }) => {
    const { currentPage, setCurrentPage, nextPage } = useModalPagination(3);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formState = useAppSelector((state) => state.login.form);

    const [checkIdentifier, { data: identifierExists }] = useLazyIdentifierExistsQuery();
    const [signIn, { error: signInError }] = useSignInMutation();

    const handleSignIn = async (e) => {
        e.preventDefault();

        const result = await signIn(formState);

        if (result.error) {
            return toast.error(result.error.message);
        }

        if (!result.error && result.data.isEmailVerified === false) {
            closeLoginModal();
            dispatch(modalActions.openModal({
                name: "VerificationModal",
                props: { userId: result.data.id }
            }))
        }

        if (!result.error && result.data.isAuthenticated) {
            // navigate("/home");
            closeLoginModal();
        }
    };

    const debouncedOnChange = async ({ target }) => {
        dispatch(
            loginActions.updateForm({
                name: "identifier",
                value: target.value
            })
        );

        target.value.length > 0 && (await checkIdentifier(target.value));
    }

    const closeLoginModal = () => {
        setCurrentPage(1);
        dispatch(loginActions.clearForm());
        closeModal();
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={closeLoginModal}
            className="login-modal"
        >
            <ColumnHeader
                className="login-modal_header"
                closeModal={true}
            >
                <div className="header_container">
                    <div className="logo-container">
                        <Logo />
                    </div>
                </div>
            </ColumnHeader>

            <form
                className="login-modal_form"
                onSubmit={handleSignIn}
            >
                {currentPage === 1 && (
                    <div className="page">
                        <h1>Sign in to X</h1>

                        <div className="signin-methods">
                            <a
                                href={`${process.env.REACT_APP_API_URL}/auth/google`}
                                className="white-btn signup-btn"
                            >
                                <IconContext.Provider
                                    value={{ className: "signup_icon" }}
                                >
                                    <FcGoogle size="18" />
                                </IconContext.Provider>
                                Sign in with Google
                            </a>

                            <div className="category-separator">
                                <div>or</div>
                            </div>

                            <TextInput
                                type="text"
                                id="identifier"
                                name="identifier"
                                label="Username/email"
                                onChange={debouncedOnChange}
                                value={formState.identifier}
                                error={!identifierExists}
                            />
                        </div>

                        <button
                            className="white-btn next"
                            onClick={nextPage}
                            disabled={!formState.identifier || !identifierExists}
                        >
                            Next
                        </button>

                        <button
                            className="btn-empty"
                            disabled
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                {currentPage === 2 && (
                    <div className="page p2">
                        <h1>Enter your password</h1>

                        <TextInput
                            type="text"
                            id="identifier"
                            name="identifier"
                            label="Username/email"
                            value={formState.identifier}
                            disabled={true}
                        />

                        <TextInput
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                            onChange={({ target }) => dispatch(
                                loginActions.updateForm({
                                    name: "password",
                                    value: target.value
                                })
                            )}
                            value={formState.password}
                            error={signInError}
                        />

                        <Link
                            to={`/`}
                            className="forgot-password link-blue"
                        >
                            Forgot password?
                        </Link>

                        <button
                            type="submit"
                            className="white-btn next"
                        >
                            Log In
                        </button>
                    </div>
                )}

                <div className="no-account">
                    <span>Don't have an account? </span>

                    <button
                        type="button"
                        className="link-blue"
                        onClick={() => dispatch(
                            modalActions.openModal({
                                name: "RegisterModal"
                            })
                        )}
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};

export default LoginModal;
