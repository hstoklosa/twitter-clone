import "../styles/App.css";

import { useState } from "react";
import { ColumnHeader, Links, Feed, TweetInput, TabList } from "../components";

const EmptyFeed = () => {
    return (
        <div className="not-found-container">
            <h1>Nothing to see!</h1>
            <p>No tweets found</p>
        </div>
    );
};

const Home = () => {
    const [tab, setTab] = useState("For you");

    return (
        <main>
            <div
                className="column"
                id="general"
            >
                <ColumnHeader className="home-column-header">
                    <h1>Home</h1>

                    <TabList
                        activeTab={tab}
                        setActiveTab={setTab}
                        tabs={["For you", "Following"]}
                    />
                </ColumnHeader>

                <Feed
                    tweets={[]}
                    NotFoundComponent={<EmptyFeed />}
                />
            </div>

            <div
                className="column"
                id="widgets"
            >
                <div className="sticky-wrapper">
                    {/* TODO: Other widgets */}
                    <Links />
                </div>
            </div>
        </main>
    );
};

export default Home;
