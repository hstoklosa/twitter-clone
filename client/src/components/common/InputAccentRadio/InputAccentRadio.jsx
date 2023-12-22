import "./styles.css";

import { IoMdCheckmark } from "react-icons/io";
import { useTheme } from '../../../contexts/ThemeProvider';

const InputAccentRadio = ({ type }) => {
    const { accent, changeAccent } = useTheme();
    const isChecked = type === accent;

    return (
        <label
            className={`accent-radio ${type}`}
            htmlFor={type}
        >
            <input
                className='accent-radio_input'
                id={type}
                type='radio'
                name='accent'
                value={type}
                checked={isChecked}
                onChange={changeAccent}
            />
            <span className='accent-radio_selected'>
                <IoMdCheckmark className="accent-radio_selected-icon" />
            </span>
        </label >
    )
}

export default InputAccentRadio;