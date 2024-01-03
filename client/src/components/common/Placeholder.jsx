const Placeholder = ({ title, subtitle, image, children }) => {
    return (
        <div className="placeholder">
            {image && (
                <div className="placeholder__image">
                    <img src={image} alt="Placeholder" />
                </div>
            )}

            <div className="placeholder-text__title">
                {title ?? "Nothing to see here"}
            </div>

            <div className="placeholder-text__subtitle">
                {subtitle ?? "Try again soon!"}
            </div>

            {children}
        </div>
    );
};

export default Placeholder;
