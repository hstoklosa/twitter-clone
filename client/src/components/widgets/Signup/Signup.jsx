import "../../../routes/Login/styles.css";

import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";

const Signup = ({ openModal }) => {
    return (
        <div className="signup-container">
            <h2>New to Twitter Clone?</h2>
            <p>Sign up now to get your own personalized timeline!</p>

            <a
                href="http://localhost:8080/api/auth/google"
                className="white-btn signup-btn"
            >
                <IconContext.Provider value={{ className: "signup_icon" }}>
                    <FcGoogle size="18" />
                </IconContext.Provider>
                Sign up with Google
            </a>

            <button
                className="white-btn signup-btn"
                onClick={openModal}
            >
                Create Account
            </button>

            <p className="agreement-text">
                <span>By signing up, you agree to the </span>
                <a
                    href="https://twitter.com/"
                    target="__blank"
                    className="link-blue"
                >
                    Terms of Service
                </a>
                <span> and </span>
                <a
                    href="https://twitter.com/"
                    target="__blank"
                    className="link-blue"
                >
                    Privacy Policy
                </a>
                <span> including </span>
                <a
                    href="https://twitter.com/"
                    target="__blank"
                    className="link-blue"
                >
                    Cookie Use
                </a>
                .
            </p>
        </div>
    );
};

export default Signup;
