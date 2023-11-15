export const MiddleColumn = ({ children }) => {
    return (
        <div
            className="column"
            id="general"
        >
            {children}
        </div>
    );
};

export const LeftColumn = ({ children }) => {
    return (
        <div
            className="column"
            id="widgets"
        >
            {children}
        </div>
    );
};
