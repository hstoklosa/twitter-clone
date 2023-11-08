import { Link } from "react-router-dom";

const ConditionalLink = ({ children, condition, ...props }) => {
    return !!condition && props.to ? (
        <Link {...props}>{children}</Link>
    ) : (
        <div {...props}>{children}</div>
    );
};

export default ConditionalLink;
