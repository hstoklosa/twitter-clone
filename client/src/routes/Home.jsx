import "../styles/App.css";
import "../styles/Login.css";

import { Links, Feed, TweetInput } from "../components";

const Home = () => {
    return (
        <main>
            <div className="column" id="general">
                <header>
                    <h1>Home</h1>
                </header>

                <TweetInput />
                <Feed />
            </div>

            <div className="column" id="widgets">
                <div className="sticky-wrapper">
                    <Links />
                </div>
            </div>
        </main>
    );
};

export default Home;
