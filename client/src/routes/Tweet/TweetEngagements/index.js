import { useParams } from "react-router-dom";

import {
    MiddleColumn,
    LeftColumn,
    ColumnHeader,
    PaginatedList,
    TabList,
    TweetPreview,
    UserPreview,
    Placeholder,
    Trending,
    Connect,
    SearchBar,
    TabPanel
} from "../../../components";

import {
    useGetQuotesQuery,
    useGetRepostUsersQuery,
    useGetLikeUsersQuery,
} from "../../../features/api/tweetApi";


const TweetEngagements = () => {
    const { tweetId } = useParams();

    return (
        <main>
            <MiddleColumn >
                <ColumnHeader routerBack={true}>
                    <h1>Post engagements</h1>
                </ColumnHeader>

                <TabList
                    options={{
                        tabs: ["quotes", "reposts", "likes"],
                    }}
                >
                    <TabPanel name="quotes">
                        <PaginatedList
                            queryHook={useGetQuotesQuery}
                            args={{ id: tweetId }}
                            renderItem={(data) =>
                                <TweetPreview tweet={data} />
                            }
                            renderPlaceholder={() => (
                                <Placeholder
                                    title="No Quotes yet"
                                    subtitle="You will find a list of everyone who quoted this post here."
                                />
                            )}
                        />
                    </TabPanel>

                    <TabPanel name="reposts">
                        <PaginatedList
                            queryHook={useGetRepostUsersQuery}
                            args={{ id: tweetId }}

                            renderItem={(data) =>
                                <UserPreview user={data} />
                            }
                            renderPlaceholder={() => (
                                <Placeholder
                                    title="No Reposts yet"
                                    subtitle="Share someone else's post on your timeline by reposting it. When you do, it'll show up here."
                                />
                            )}
                        />
                    </TabPanel>

                    <TabPanel name="likes">
                        <PaginatedList
                            queryHook={useGetLikeUsersQuery}
                            args={{ id: tweetId }}
                            renderItem={(data) =>
                                <UserPreview user={data} />
                            }
                            renderPlaceholder={() => (
                                <Placeholder
                                    title="No likes yet"
                                    subtitle="When someone taps the heart to Like this post, it'll show up here."
                                />
                            )}
                        />
                    </TabPanel>
                </TabList>

            </MiddleColumn >

            <LeftColumn>
                <SearchBar />
                <Trending />
                <Connect />
            </LeftColumn>
        </main>
    )
}

export default TweetEngagements;