import "./styles.css";

import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";

import { useTheme } from "../../contexts/ThemeProvider";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { modalActions } from "../../features/slices/modalSlice";
import { SignupModal, LoginModal, VerificationModal, Logo } from "../../components";


const Auth = () => {
    const { signInModal, signUpModal, verificationModal } = useAppSelector((state) => state.modal);
    const { theme } = useTheme();

    const dispatch = useAppDispatch();

    return (
        <main id="app-container" className="auth-route">
            <SignupModal
                isOpen={signUpModal}
                closeModal={() => dispatch(modalActions.disableSignUpModal())}
            />

            <LoginModal
                isOpen={signInModal}
                closeModal={() => dispatch(modalActions.disableSignInModal())}
            />

            <VerificationModal
                isOpen={verificationModal.isOpen}
                closeModal={() => dispatch(modalActions.disableVerificationModal())}
            />

            <Logo />

            <h1
                className="logo-text"
                style={{
                    fontSize: "15vmin",
                    fontWeight: "800",
                    color: "var(--text-primary)",
                    textAlign: "center"
                }}
            >
                X/Twitter
                Clone
            </h1>

            <div className="signup-container">
                <div className="wrapper">
                    <a
                        href={`${process.env.REACT_APP_API_URL}/auth/google`}
                        className="white-btn signup-btn"
                    >
                        <IconContext.Provider value={{ className: "signup_icon" }}>
                            <FcGoogle size="18" />
                        </IconContext.Provider>
                        Sign up with Google
                    </a>

                    <button
                        className="white-btn signup-btn"
                        onClick={() => dispatch(
                            modalActions.enableSignUpModal()
                        )}
                    >
                        Create Account
                    </button>
                    <button
                        className="login btn-empty"
                        onClick={() => dispatch(modalActions.enableSignInModal())}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </main >
    );
};

export default Auth;
