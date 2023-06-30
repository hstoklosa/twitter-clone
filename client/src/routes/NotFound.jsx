import "../styles/NotFound.css";

const NotFound = () => {
    return (
        <section id="not-found">
            <div className="container">
                <h1 class="header">404</h1>
                <p class="message">Page Not Found</p>
                <a class="home-link" href="/">
                    Go Home
                </a>
            </div>
        </section>
    );
};

export default NotFound;
