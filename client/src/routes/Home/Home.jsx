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
                        tabs={["For you", "Following"]}
                        currentTab={tab}
                        setCurrentTab={setTab}
                    />
                </ColumnHeader>

                <TweetInput maxLength={280} />

                {tab === "For you" && (
                    <Feed
                        tweets={[]}
                        isTweetsLoading={true}
                        NotFoundComponent={<EmptyFeed />}
                    />
                )}
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
