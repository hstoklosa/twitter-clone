import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";

const InputContainer = ({ type, id, name, value, onChange, onBlur, onFocus, label, disabled, error, setError }) => {
    const [isVisible, setVisible] = useState(false);

    const toggle = () => setVisible(!isVisible);

    return (
        <div className="input-container">
            <input
                type={isVisible ? "text" : type}
                id={id}
                name={name}
                className={`
                     ${value ? "not-empty" : ""} 
                     ${error && value.length > 0 ? "error" : ""}
               `}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={disabled}
            />

            <label htmlFor={name}>{label || name.charAt(0).toUpperCase() + name.slice(1)}</label>

            {error && value.length > 0 ? <p className="error-message">{error}</p> : null}

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
