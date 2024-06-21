import { useParams } from "react-router-dom";

import { useGetUserFollowersQuery, useGetUserFollowingQuery } from "../../../features/api/userApi";
import {
    ColumnHeader,
    MiddleColumn,
    LeftColumn,
    Placeholder,
    TabList,
    PaginatedList,
    UserPreview,
    Trending,
    Connect,
    SearchBar,
    Links,
    TabPanel
} from "../../../components";


const ProfileConnections = () => {
    const { username } = useParams();

    return (
        <main>
            <MiddleColumn>
                <ColumnHeader routerBack={true}>
                    <h1>Connections</h1>
                </ColumnHeader>

                <TabList
                    options={{
                        tabs: ["followers", "following"]
                    }}
                >
                    <TabPanel name="followers">
                        <PaginatedList
                            queryHook={useGetUserFollowersQuery}
                            args={{ username: username }}
                            renderItem={(data) =>
                                <UserPreview user={data} />
                            }
                            renderPlaceholder={() => (
                                <Placeholder
                                    title="Looking for followers?"
                                    subtitle="When someone follows this account, they'll show up here. Tweeting and interacting with others helps boost followers."
                                />
                            )}
                        />
                    </TabPanel>

                    <TabPanel name="following">
                        <PaginatedList
                            queryHook={useGetUserFollowingQuery}
                            args={{ username: username }}
                            renderItem={(data) =>
                                <UserPreview user={data} />
                            }
                            renderPlaceholder={() => (
                                <Placeholder
                                    title="The user isn't following anyone"
                                    subtitle="Once they follow accounts, they'll show up here."
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
    );

}

export default ProfileConnections;