import "../styles/NotFound.css";

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section id="not-found">
            <div className="container">
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
        </section>
    );
};

export default NotFound;
