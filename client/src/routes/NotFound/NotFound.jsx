import "./styles.css";

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div id="not-found">
            <h1>404</h1>
            <p>Page Not Found</p>

            <Link
                to={`/`}
                state={{}}
                className="home-link"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
