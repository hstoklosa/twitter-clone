import "../styles/Login.css";

import { Links, Signup } from "../components";

const Login = () => {
    return (
        <>
            <div className="column second">
                <header>
                    <h1>Explore</h1>
                </header>
            </div>

            <div className="column last">
                <div className="sticky-wrapper">
                    <Signup />
                    <Links />
                </div>
            </div>

            <div className="footer-login">
                <div className="footer_text">
                    <h2>Don't miss what's happening</h2>
                    <p>People on Twitter are the first to know.</p>
                </div>
                <div className="footer_btns">
                    <a href="https://twitter.com" className="btn login">
                        Log In
                    </a>
                    <a href="https://twitter.com" className="btn signup">
                        Sign up
                    </a>
                </div>
            </div>
        </>
    );
};

export default Login;
