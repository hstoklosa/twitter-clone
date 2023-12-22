import "./styles.css";

import { IoMdCheckmark } from "react-icons/io";
import { useTheme } from '../../../contexts/ThemeProvider';

const InputThemeRadio = ({ type, label }) => {
    const { theme, changeTheme } = useTheme();
    const isChecked = type === theme;

    return (
        <label
            className={`theme-radio ${type} ${isChecked ? 'checked' : ''}`}
            htmlFor={type}
        >
            <input
                className='theme-radio_input'
                id={type}
                type='radio'
                name='theme'
                value={type}
                checked={isChecked}
                onChange={changeTheme}
            />
            <span className='theme-radio_selected'>
                <IoMdCheckmark className="theme-radio_selected-icon" />
            </span>

            <span className="theme-radio_label">
                {label}
            </span>
        </label >
    )
}

export default InputThemeRadio;