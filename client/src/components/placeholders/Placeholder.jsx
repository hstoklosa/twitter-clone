const Placeholder = ({ header, subheader, image }) => {
    return (
        <div className="placeholder">
            {image && <div className="placeholder__image"></div>}
            <div className="placeholder-text__heading">{header}</div>
            <div className="placeholder-text__subheading">{subheader}</div>
        </div>
    );
};

export default Placeholder;
