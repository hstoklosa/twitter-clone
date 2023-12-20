import { useParams } from "react-router-dom";

import { useGetUserFollowersQuery, useGetUserFollowingQuery } from "../../../features/api/userApi";
import {
    ColumnHeader,
    MiddleColumn,
    LeftColumn,
    Placeholder,
    PaginatedTabList,
    PaginatedList,
    UserPreview,
} from "../../../components";

import withQuery from "../../../hoc/withQuery";

const FollowersList = withQuery(useGetUserFollowersQuery)(PaginatedList);
const FollowingList = withQuery(useGetUserFollowingQuery)(PaginatedList);

const ProfileConnections = () => {
    const { username } = useParams();

    const renderPanel = (currTab) => {
        switch (currTab) {
            case 'followers':
                return (
                    <FollowersList
                        component={UserPreview}
                        renderPlaceholder={() => (
                            <Placeholder
                                title="Looking for followers?"
                                subtitle="When someone follows this account, they'll show up here. Tweeting and interacting with others helps boost followers."
                            />
                        )}
                        args={{ username: username }}
                    />
                )
            case 'following':
                return (
                    <FollowingList
                        component={UserPreview}
                        renderPlaceholder={() => (
                            <Placeholder
                                title="The user isn't following anyone"
                                subtitle="Once they follow accounts, they'll show up here."
                            />
                        )}
                        args={{ username: username }}
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
                />
                <PaginatedTabList
                    options={{
                        tabs: ["followers", "following"]
                    }}
                    renderPanel={renderPanel}
                />
            </MiddleColumn>

            <LeftColumn>

            </LeftColumn>
        </main>
    );

}

export default ProfileConnections;