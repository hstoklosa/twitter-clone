import "./styles.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { BiCog } from "react-icons/bi";

import { useAppSelector } from "../../app/store";
import { useLazyGetSearchUsersQuery } from "../../features/api/userApi";
import { useGetHomeTimelineQuery } from "../../features/api/tweetApi";

import {
    MiddleColumn,
    LeftColumn,
    ColumnHeader,
    TweetForm,
    PaginatedList,
    TweetPreview,
    SearchBar,
    FloatOptions,
    Links,
    Trending,
    Connect,
} from "../../components";

import withQuery from "../../hoc/withQuery";

const PaginatedHomeList = withQuery(useGetHomeTimelineQuery)(PaginatedList);

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { user: currentUser } = useAppSelector((state) => state.auth);

    const [triggerUserSearch, { data: users }] = useLazyGetSearchUsersQuery();

    const handleDebounceChange = (search) => {
        triggerUserSearch(search);
        setSearchQuery(search)
    }

    const handleSettingClick = () => {
        triggerUserSearch();
    };

    return (
        <main>
            <MiddleColumn>
                <ColumnHeader className="home-column-header">
                    <h1>Home</h1>

                    <button
                        className="dark_round-btn"
                        onClick={handleSettingClick}
                    >
                        <div className="icon-container">
                            <BiCog
                                size="20"
                                className="icon"
                            />
                        </div>
                    </button>
                </ColumnHeader>

                <TweetForm maxLength={280} />

                <PaginatedHomeList
                    component={TweetPreview}
                    args={{ id: currentUser.id }}
                />
            </MiddleColumn>

            <LeftColumn>
                <SearchBar onChange={handleDebounceChange}>
                    <>
                        <Link
                            type="button"
                            className="float-btn search-tweets_btn"
                        >
                            Search for "{searchQuery}"
                        </Link>

                        <Link
                            to={`/status/${searchQuery}`}
                            className="float-btn search-tweets_btn"
                        >
                            Go to @{searchQuery}
                        </Link>

                    </>
                </SearchBar>
                <Connect />
                <Trending />
                <Links />
            </LeftColumn>
        </main >
    );
};

export default Home;
