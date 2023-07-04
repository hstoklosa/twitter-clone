import "../../styles/SignupModal.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";

import { BaseModal, InputContainer, SelectContainer } from "../index";
import { useAuth } from "../../context/AuthProvider";
import { emailRegex, months, days, years } from "../../utils";

const NUM_PAGES = 4;

const SignupModal = ({ isOpen, closeModal }) => {
    const navigate = useNavigate();
    const { confirmEmail, checkIdentifier, signUp } = useAuth();

    const [page, setPage] = useState(1);
    const [formState, setFormState] = useState({
        displayName: "",
        email: "",
        password: "",
        username: "",
        month: "",
        day: "",
        year: "",
        code: "",
    });

    const [code, setCode] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [codeError, setCodeError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);

    const nextPage = () => page < NUM_PAGES && setPage(page + 1);
    const prevPage = () => page > 1 && setPage(page - 1);

    const handleEmailBlur = (e) => {
        const passRegex = emailRegex.test(String(e.target.value).toLowerCase());
        const duplicateEmail = checkIdentifier(e.target.value);

        if (!passRegex) {
            return setEmailError("Provide a valid email address!");
        }

        if (!duplicateEmail) {
            return setEmailError("Provide a unique email address!");
        }
    };

    const handleEmailConfirmation = () => {
        nextPage();
        confirmEmail(formState.email, setCode);
    };

    const handleVerificationBlur = (e) => {
        if (e.target.value !== code) {
            return setCodeError("The code is incorrect!");
        }

        return setCodeError(null);
    };

    const handlePasswordBlur = (e) => {
        if (!(e.target.value.length >= 8)) {
            return setPasswordError("Password must be at least 8 characters.");
        }

        return setPasswordError(null);
    };

    const handleUsernameBlur = async (e) => {
        const identifierExists = await checkIdentifier(e.target.value);

        if (identifierExists) {
            return setUsernameError("The username is already taken!");
        }

        return setUsernameError(null);
    };

    const handleSignUp = () => {
        const response = signUp(formState);

        if (response.success) {
            closeModal();
            return navigate("/home");
        }
    };

    const updateFormState = (field, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <BaseModal isOpen={isOpen} onClose={closeModal}>
            <header className="signup-modal_header">
                <button className="btn-close-modal" onClick={page === 1 ? closeModal : prevPage}>
                    <IconContext.Provider
                        value={{
                            className: "btn-close_icon",
                        }}
                    >
                        {page === 1 ? <IoMdClose size="25" /> : <BiArrowBack size="22" />}
                    </IconContext.Provider>
                </button>
                <h3>
                    Step {page} of {NUM_PAGES}
                </h3>
            </header>

            <form className="signup-modal_content">
                {page === 1 && (
                    <div className="page page-1">
                        <h2>Create your account</h2>

                        <InputContainer
                            type="text"
                            id="name"
                            name="name"
                            value={formState.displayName}
                            onChange={(e) => updateFormState("displayName", e.target.value)}
                        />

                        <InputContainer
                            type="text"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={(e) => updateFormState("email", e.target.value)}
                            onFocus={() => setEmailError(null)}
                            onBlur={handleEmailBlur}
                            error={emailError}
                            setError={setEmailError}
                        />

                        <div className="dob-container">
                            <h4>Date of birth</h4>
                            <p>
                                This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something
                                else.
                            </p>
                            <div className="select-container">
                                {/* Label after select to select it as sibling in css */}

                                <SelectContainer
                                    name="month"
                                    id="month"
                                    className="month-select"
                                    value={formState.month}
                                    onChange={(e) => updateFormState("month", e.target.value)}
                                    options={months}
                                    label="Month"
                                />

                                <SelectContainer
                                    name="day"
                                    id="day"
                                    className="day-select"
                                    value={formState.day}
                                    onChange={(e) => updateFormState("day", e.target.value)}
                                    options={days}
                                    label="Day"
                                />

                                <SelectContainer
                                    name="year"
                                    id="year"
                                    className="year-select"
                                    value={formState.year}
                                    onChange={(e) => updateFormState("year", e.target.value)}
                                    options={years}
                                    label="Year"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn-next"
                            disabled={
                                !formState.displayName || !formState.email || emailError || !formState.month || !formState.day || !formState.year
                            }
                            onClick={handleEmailConfirmation}
                        >
                            Next
                        </button>
                    </div>
                )}

                {page === 2 && (
                    <div className="page page-2">
                        <div className="page-content">
                            <h2>We sent you a code</h2>
                            <p>Enter it below to verify {formState.email}</p>

                            <InputContainer
                                type="text"
                                id="code"
                                name="code"
                                value={formState.code}
                                onChange={(e) => updateFormState("code", e.target.value)}
                                onFocus={() => setCodeError(null)}
                                onBlur={handleVerificationBlur}
                                error={codeError}
                                setError={setCodeError}
                                label="Verification Code"
                            />
                        </div>

                        <button className="btn-next" disabled={formState.code !== code} onClick={nextPage}>
                            Next
                        </button>
                    </div>
                )}

                {page === 3 && (
                    <div className="page page-3">
                        <div className="page-content">
                            <h2>You'll need a password</h2>
                            <p>Make sure it's 8 characters or more.</p>

                            <InputContainer
                                type="password"
                                id="password"
                                name="password"
                                value={formState.password}
                                onChange={(e) => updateFormState("password", e.target.value)}
                                onFocus={() => setPasswordError(null)}
                                onBlur={handlePasswordBlur}
                                error={passwordError}
                                setError={setPasswordError}
                            />
                        </div>

                        <button type="button" className="btn-next" disabled={passwordError} onClick={nextPage}>
                            Next
                        </button>
                    </div>
                )}

                {page === 4 && (
                    <div className="page page-3">
                        <div className="page-content">
                            <h2>What should we call you?</h2>
                            <p>Your @username is unique. You can always change it later.</p>

                            <InputContainer
                                type="text"
                                id="username"
                                name="username"
                                value={formState.username}
                                onChange={(e) => updateFormState("username", e.target.value)}
                                onFocus={() => setUsernameError(null)}
                                onBlur={handleUsernameBlur}
                                error={usernameError}
                                setError={setUsernameError}
                            />
                        </div>

                        <button type="button" className="btn-next" disabled={usernameError} onClick={handleSignUp}>
                            Next
                        </button>
                    </div>
                )}
            </form>
        </BaseModal>
    );
};

export default SignupModal;
