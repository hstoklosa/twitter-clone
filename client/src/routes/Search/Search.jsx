import { useSearchParams } from "react-router-dom";

import { useGetSearchUsersQuery } from "../../features/api/userApi";
import { useGetSearchTweetsQuery } from "../../features/api/tweetApi";

import {
    MiddleColumn,
    LeftColumn,
    ColumnHeader,
    PaginatedList,
    UserPreview,
    TweetPreview,
    Placeholder,
    TabList,
    TabPanel,
    Trending,
    Connect,
    Links,
    SearchBar
} from '../../components';


const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    return (
        <main>
            <MiddleColumn>
                <ColumnHeader
                    className="search-route_header"
                    routerBack={true}
                >
                    <h1>Search</h1>
                </ColumnHeader>

                <TabList
                    options={{
                        tabs: ["tweets", "people"],
                        index: `/search`,
                    }}
                >
                    <TabPanel name="tweets">
                        <PaginatedList
                            queryHook={useGetSearchTweetsQuery}
                            args={{ searchQuery: query }}
                            renderItem={(data) =>
                                <TweetPreview tweet={data} />
                            }
                            renderPlaceholder={() => (
                                <Placeholder
                                    title="No results found"
                                    subtitle="Try searching again with another query!"
                                />
                            )}
                        />
                    </TabPanel>

                    <TabPanel name="people">
                        <PaginatedList
                            queryHook={useGetSearchUsersQuery}
                            args={{ searchQuery: query }}
                            renderItem={(data) =>
                                <UserPreview user={data} />
                            }
                            renderPlaceholder={() => (
                                <Placeholder
                                    title="No results found"
                                    subtitle="Try searching again with another query!"
                                />
                            )}
                        />
                    </TabPanel>
                </TabList>
            </MiddleColumn>

            <LeftColumn>
                <SearchBar />
                <Trending />
                <Connect />
                <Links />
            </LeftColumn>

        </main>
    )
}

export default Search;