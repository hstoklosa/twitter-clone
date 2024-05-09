import "../styles.css";

const FloatButton = ({ className, onClick, close, children, ...rest }) => {

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick();
        close && close();
    }

    return (
        <div
            className={`float-btn ${className}`}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </div>
    )
}

export default FloatButton;