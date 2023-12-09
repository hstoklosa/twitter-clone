import "../styles/Login.css";

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCheckAuthQuery } from "../store/api/authApi";

import { SignupModal, LoginModal, PreviewList, Links, Signup } from "../components";

const Login = () => {
    const { data } = useCheckAuthQuery();

    const [signupModal, setSignupModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const openSignupModal = () => setSignupModal(true);
    const closeSignupModal = () => setSignupModal(false);

    const openLoginModal = () => setLoginModal(true);
    const closeLoginModal = () => setLoginModal(false);

    if (data?.isAuthenticated) {
        return (
            <Navigate
                to="/home"
                replace
            />
        );
    }

    return (
        <main>
            <SignupModal
                isOpen={signupModal}
                closeModal={closeSignupModal}
            />
            <LoginModal
                isOpen={loginModal}
                closeModal={closeLoginModal}
            />

            <div
                className="column"
                id="general"
            >
                <header>
                    <h1>Explore</h1>
                </header>

                <PreviewList items={[]} />
            </div>

            <div
                className="column"
                id="widgets"
            >
                <div className="sticky-wrapper">
                    <Signup openModal={openSignupModal} />
                    <Links />
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
                        onClick={openLoginModal}
                    >
                        Log In
                    </button>
                    <button
                        className="white-btn signup"
                        onClick={openSignupModal}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Login;
