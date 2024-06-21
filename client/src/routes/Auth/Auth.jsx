import "./styles.css";

import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/store";
import { modalActions } from "../../features/slices/modalSlice";
import { SignupModal, LoginModal, VerificationModal, Logo } from "../../components";

import {
    useSignInMutation,
    useLazyCheckAuthQuery
} from "../../features/api/authApi";
import { useEffect } from "react";

const Auth = () => {
    // const isAuth = useAppSelector((state) => state.auth.isAuth);
    const navigate = useNavigate();

    const [checkAuth] = useLazyCheckAuthQuery();
    const [_, { data: signInResult }] = useSignInMutation({
        fixedCacheKey: 'shared-sign-in',
    });

    useEffect(() => {
        const fetchAuth = async () => await checkAuth();

        if (signInResult?.isAuthenticated) {
            fetchAuth()
        }
    }, [signInResult]);


    const dispatch = useAppDispatch();

    return (
        <main id="app-container" className="auth-route">
            <div className="logo-wrapper">
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
                    CLONE
                </h1>

            </div>


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
                            modalActions.openModal({ name: "RegisterModal" })
                        )}
                    >
                        Create Account
                    </button>

                    <button
                        className="login btn-empty"
                        onClick={() => dispatch(
                            modalActions.openModal({ name: "LoginModal" })
                        )}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </main >
    );
};

export default Auth;
