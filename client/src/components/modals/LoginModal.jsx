import "../../styles/LoginModal.css";
import logo from "../../assets/logo-white.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

import { BaseModal, InputContainer } from "../index";
import { useAuth } from "../../context/AuthProvider";

const NUM_PAGES = 3;

const LoginModal = ({ isOpen, closeModal }) => {
    const navigate = useNavigate();
    const { checkIdentifier, signIn } = useAuth();

    const [page, setPage] = useState(1);

    const [formState, setFormState] = useState({
        identifier: "",
        password: "",
    });

    const [identifierError, setIdentifierError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const nextPage = () => page < NUM_PAGES && setPage(page + 1);
    const prevPage = () => page > 1 && setPage(page - 1);

    const handleIdentifierBlur = async (e) => {
        const identifierExists = await checkIdentifier(e.target.value);

        if (!identifierExists) {
            return setIdentifierError("The username/email does not exist!");
        }

        return setIdentifierError(null);
    };

    const handleSignIn = async () => {
        const response = await signIn(formState);

        if (!response.success) {
            return setPasswordError("The provided password is incorrect!");
        }

        closeModal();
        navigate("/home");
    };

    const updateFormState = (field, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <BaseModal isOpen={isOpen} onClose={closeModal}>
            <header className="login-modal_header">
                <button className="btn-close-modal" onClick={closeModal}>
                    <IconContext.Provider value={{ className: "btn-close_icon" }}>
                        <IoMdClose size="25" />
                    </IconContext.Provider>
                </button>
                <div></div>
            </header>

            <form className="login-modal_content">
                {page === 1 && (
                    <div className="page page-1">
                        <a href="/" className="logo-container">
                            <img src={logo} alt="Logo" />
                        </a>

                        <h1>Sign in to Twitter</h1>

                        <div className="signin-methods">
                            <a href="http://localhost:3001/oauth/google" className="signup-btn">
                                <IconContext.Provider value={{ className: "signup_icon" }}>
                                    <FcGoogle size="18" />
                                </IconContext.Provider>
                                Sign up with Google
                            </a>
                            <div className="category-separator">
                                <div className="line"></div>
                                <p>or</p>
                                <div className="line"></div>
                            </div>
                            <InputContainer
                                type="text"
                                id="identifier"
                                name="identifier"
                                value={formState.identifier}
                                onChange={(e) => updateFormState("identifier", e.target.value)}
                                onFocus={() => setIdentifierError(null)}
                                onBlur={handleIdentifierBlur}
                                error={identifierError}
                                setError={setIdentifierError}
                                label="Username/email"
                            />
                        </div>
                        <button type="button" className="btn-next" disabled={!formState.identifier && !identifierError} onClick={nextPage}>
                            Next
                        </button>
                        <button className="btn-forgot-password" onClick={() => console.log(page)}>
                            Forgot password?
                        </button>
                        <p className="no-account">
                            Don't have an account?{" "}
                            <a href="/home" className="link-blue">
                                Signup
                            </a>
                        </p>
                    </div>
                )}

                {page === 2 && (
                    <div className="page page-2">
                        <a href="/" className="logo-container">
                            <img src={logo} alt="Logo" />
                        </a>

                        <h1>Enter your password</h1>

                        <InputContainer
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={formState.identifier}
                            onChange={(e) => updateFormState("identifier", e.target.value)}
                            onFocus={() => setIdentifierError(null)}
                            onBlur={handleIdentifierBlur}
                            error={identifierError}
                            setError={setIdentifierError}
                            label="Username/email"
                            disabled={true}
                        />

                        <InputContainer
                            type="password"
                            id="password"
                            name="password"
                            value={formState.password}
                            onChange={(e) => updateFormState("password", e.target.value)}
                            onFocus={() => setPasswordError(null)}
                            error={passwordError}
                            setError={setPasswordError}
                        />

                        <a href="/" className="forgot-password link-blue">
                            Forgot password?
                        </a>

                        <button type="button" className="btn-next" onClick={handleSignIn}>
                            Next
                        </button>
                        <p className="no-account">
                            Don't have an account?{" "}
                            <a href="/home" className="link-blue">
                                Signup
                            </a>
                        </p>
                    </div>
                )}
            </form>
        </BaseModal>
    );
};

export default LoginModal;
