import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LinkButton = ({ to = null, state = {}, onClick, children, ...rest }) => {
    const navigate = useNavigate();

    return (
        <button
            {...rest}
            onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onClick && onClick(event);
                to && navigate(to, state);
            }}
        >
            {children}
        </button>
    );
};

LinkButton.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LinkButton;
