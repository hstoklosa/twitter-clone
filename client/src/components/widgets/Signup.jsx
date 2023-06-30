import "../../styles/Login.css";

import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    return (
        <div className="signup-container">
            <h2>New to Twitter Clone?</h2>
            <p>Sign up now to get your own personalized timeline!</p>

            <a href="http://localhost:3001/oauth/google" className="signup-btn">
                <IconContext.Provider value={{ className: "signup_icon" }}>
                    <FcGoogle size="18" />
                </IconContext.Provider>
                Sign up with Google
            </a>

            <button type="button" className="signup-btn">
                Create Account
            </button>

            <p className="agreement-text">
                By signing up, you agree to the{" "}
                <a href="https://twitter.com/" target="__blank" className="link-blue">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="https://twitter.com/" target="__blank" className="link-blue">
                    Privacy Policy
                </a>
                , including{" "}
                <a href="https://twitter.com/" target="__blank" className="link-blue">
                    Cookie Use
                </a>
                .
            </p>
        </div>
    );
};

export default Signup;
