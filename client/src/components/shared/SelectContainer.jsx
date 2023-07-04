const SelectContainer = ({ name, id, className, value, onChange, options, label }) => {
    return (
        <div className={`select-wrapper ${className}`}>
            <select id={id} name={name} className={value && "not-empty"} value={value} onChange={onChange}>
                <option selected disabled></option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default SelectContainer;
