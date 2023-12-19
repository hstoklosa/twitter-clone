import "./styles.css";
import logo from "../../../src/assets/logo-blue.png";

import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { modalActions } from "../../features/slices/modalSlice";
import { SignupModal, LoginModal, VerificationModal } from "../../components";


const Login = () => {
    const { signInModal, signUpModal, verificationModal } = useAppSelector((state) => state.modal);

    const dispatch = useAppDispatch();

    return (
        <main className="auth-route app-container">
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

            <img
                src={logo}
                className="twitter-logo"
                alt="Twitter's Logo"
            />

            <div className="signup-container">
                <div className="text wrapper">
                    <h2>New to Twitter Clone?</h2>
                    <p>Sign up now to give the clone a try!</p>
                </div>

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
                </div>
            </div>

            <div className="footer-login">
                <div className="footer_text">
                    <h2>Don't miss what's happening</h2>
                    <p>People on Twitter are the first to know.</p>
                </div>

                <div className="footer_btns">
                    <button
                        className="login"
                        onClick={() => dispatch(modalActions.enableSignInModal())}
                    >
                        Log In
                    </button>

                    <button
                        className="white-btn signup"
                        onClick={() => dispatch(modalActions.enableSignUpModal())}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </main >
    );
};

export default Login;
