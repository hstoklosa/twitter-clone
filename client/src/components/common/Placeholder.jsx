const Placeholder = ({ header, subheader, image }) => {
    return (
        <div className="placeholder">
            {image && <div className="placeholder__image"></div>}

            <div className="placeholder-text__heading">
                {header || "Nothing to see here"}
            </div>
            <div className="placeholder-text__subheading">
                {subheader || "Try again soon!"}
            </div>
        </div>
    );
};

export default Placeholder;
