import classNames from "classnames";

import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const TextInput = ({
    type,
    id,
    value,
    onChange,
    onBlur,
    onFocus,
    maxLength = null,
    multiline = false,
    highlight = true,
    label,
    error,
    ...props
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isFocus, setFocus] = useState(false);

    const toggleVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (e) => {
        onChange && onChange(e);
    };

    const handleFocus = (e) => {
        setFocus(true);
        onFocus && onFocus(e);
    };

    const handleBlur = (e) => {
        setFocus(false);
        onBlur && onBlur(e);
    };

    const inputClasses = classNames("input", {
        filled: value,
        highlight: value && highlight,
        error: error && !isFocus && value.length > 0,
    });

    const inputAttrs = {
        id,
        type: isPasswordVisible ? "text" : type,
        className: inputClasses,
        maxLength,
        value,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ...props,
    };

    return (
        <div className="input-wrapper">
            {type === "password" && (
                <button
                    type="button"
                    className="btn-show-password"
                    onClick={toggleVisibility}
                >
                    <IconContext.Provider value={{ className: "btn-icon" }}>
                        {isPasswordVisible ? (
                            <AiOutlineEyeInvisible size="22" />
                        ) : (
                            <AiOutlineEye size="22" />
                        )}
                    </IconContext.Provider>
                </button>
            )}

            {multiline ? <textarea {...inputAttrs} /> : <input {...inputAttrs} />}

            {maxLength && (
                <div className="character-count">
                    {value.length}/{maxLength}
                </div>
            )}

            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default TextInput;