import "./styles.css";

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main id="not-found">
            <div className="app-container">
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
        </main>
    );
};

export default NotFound;
