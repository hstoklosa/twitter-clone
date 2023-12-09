export const MiddleColumn = ({ children, ...rest }) => {
    return (
        <div
            {...rest}
            id="general"
        >
            {children}
        </div>
    );
};

export const LeftColumn = ({ children, ...rest }) => {
    return (
        <div
            {...rest}
            id="widgets"
        >
            {children}
        </div>
    );
};
