const Placeholder = ({
    title = "",
    subtitle = "",
    image,
    icon: IconComponent,
    children
}) => {
    return (
        <div className="placeholder">
            {image && (
                <div className="placeholder__image">
                    <img src={image} alt="Placeholder" />
                </div>
            )}

            {IconComponent && (
                <IconComponent className="placeholder__icon" size={36} />
            )}

            {title && (
                <p className="placeholder-text__title">
                    {title}
                </p>
            )}

            {subtitle && (
                <p className="placeholder-text__subtitle">
                    {subtitle}
                </p>
            )}

            {children}
        </div>
    );
};

export default Placeholder;
