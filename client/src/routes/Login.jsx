import "../styles/Login.css";

import { useState } from "react";
import { Navigate } from "react-router-dom";

import { SignupModal, LoginModal, Feed, Links, Signup, Loading } from "../components";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
    const { auth } = useAuth();

    const [signupModal, setSignupModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const openSignupModal = () => setSignupModal(true);
    const closeSignupModal = () => setSignupModal(false);

    const openLoginModal = () => setLoginModal(true);
    const closeLoginModal = () => setLoginModal(false);

    if (auth) {
        return <Navigate to="/home" replace />;
    }

    return (
        <>
            <SignupModal isOpen={signupModal} closeModal={closeSignupModal} />
            <LoginModal isOpen={loginModal} closeModal={closeLoginModal} />

            <div className="column" id="general">
                <header>
                    <h1>Explore</h1>
                </header>

                <Feed />
            </div>

            <div className="column" id="widgets">
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
                    <button className="btn login" onClick={openLoginModal}>
                        Log In
                    </button>
                    <button className="btn signup" onClick={openSignupModal}>
                        Sign up
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
