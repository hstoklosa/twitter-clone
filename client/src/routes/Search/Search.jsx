
import { useNavigate, useSearchParams } from "react-router-dom";

import withQuery from "../../hoc/withQuery"

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
    PaginatedTabList,
    Trending,
    Connect,
    Links
} from '../../components';
import { useEffect } from "react";

const TweetList = withQuery(useGetSearchTweetsQuery)(PaginatedList);
const PeopleList = withQuery(useGetSearchUsersQuery)(PaginatedList);

const Search = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        if (!query || query.length === 0) {
            navigate('/')
        }
    }, [query])


    const renderPanel = (currTab) => {
        switch (currTab) {
            case 'tweets':
                return (
                    <TweetList
                        component={TweetPreview}
                        renderPlaceholder={() => (
                            <Placeholder
                                title="No results found"
                                subtitle="Try searching again with another query!"
                            />
                        )}
                        args={{ searchQuery: query }}
                    />
                )
            case 'people':
                return (
                    <PeopleList
                        component={UserPreview}
                        renderPlaceholder={() => (
                            <Placeholder
                                title="No results found"
                                subtitle="Try searching again with another query!"
                            />
                        )}
                        args={{ searchQuery: query }}

                    />
                )
            default:
                break;
        }
    }

    return (
        <main>

            <MiddleColumn>
                <ColumnHeader
                    routerBack={true}
                    className="search-route_header"
                >
                    <h1>Search</h1>
                </ColumnHeader>

                <PaginatedTabList
                    options={{
                        tabs: ["tweets", "people"],
                        index: `/search`,
                    }}
                    renderPanel={renderPanel}
                />
            </MiddleColumn>

            <LeftColumn>
                <Trending />
                <Connect />
                <Links />
            </LeftColumn>

        </main>
    )
}

export default Search;