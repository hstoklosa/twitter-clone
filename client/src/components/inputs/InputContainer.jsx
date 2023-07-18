import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";

const InputContainer = ({ type, id, value, onChange, onBlur, onFocus, label, error, highlight = true, ...props }) => {
    const [localError, setLocalError] = useState(null);
    const [isVisible, setVisible] = useState(false);

    // sync localError with error prop
    useEffect(() => {
        setLocalError(error);
    }, [error]);

    const toggle = () => setVisible(!isVisible);

    const handleChange = (e) => {
        onChange && onChange(e);
    };

    const handleFocus = (e) => {
        setLocalError(null);
        onFocus && onFocus(e);
    };

    const handleBlur = (e) => {
        onBlur && onBlur(e);
    };

    return (
        <div className="input-container">
            <input
                id={id}
                type={isVisible ? "text" : type}
                className={`${value && `not-empty ${highlight && "highlight"}`} ${localError && value.length > 0 ? "error" : ""}`}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />

            <label htmlFor={id}>{label || id.charAt(0).toUpperCase() + id.slice(1)}</label>

            {localError && value.length > 0 ? <p className="error-message">{localError}</p> : null}

            {type === "password" && (
                <button type="button" className="btn-show-password" onClick={toggle}>
                    <IconContext.Provider value={{ className: "btn-icon" }}>
                        {isVisible ? <AiOutlineEyeInvisible size="22" /> : <AiOutlineEye size="22" />}
                    </IconContext.Provider>
                </button>
            )}
        </div>
    );
};

export default InputContainer;
