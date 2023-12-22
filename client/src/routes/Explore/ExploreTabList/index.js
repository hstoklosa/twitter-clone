import withQuery from '../../../hoc/withQuery';
import { useAppSelector } from '../../../app/store';

import { useGetTrendingTweetsQuery } from '../../../features/api/tweetApi';
import { useGetRecommendedUsersQuery } from '../../../features/api/userApi';

import {
    MiddleColumn,
    LeftColumn,
    ColumnHeader,
    PaginatedList,
    PaginatedTabList,
    TweetPreview,
    UserPreview
} from '../../../components';

const TweetList = withQuery(useGetTrendingTweetsQuery)(PaginatedList);
const PeopleList = withQuery(useGetRecommendedUsersQuery)(PaginatedList);

const ExploreTabList = () => {
    const { user: currentUser } = useAppSelector((state) => state.auth);

    const renderPanel = (currTab) => {
        switch (currTab) {
            case 'tweets':
                return (
                    <TweetList
                        component={TweetPreview}
                    />
                )
            case 'people':
                return (
                    <PeopleList
                        component={UserPreview}
                        args={{ id: currentUser.id }}
                    />
                )
            default:
                break;
        }
    }


    return (
        <main>
            <MiddleColumn>
                <ColumnHeader routerBack={true}>
                    <h1>Connect</h1>
                </ColumnHeader>

                <PaginatedTabList
                    options={{
                        tabs: ["tweets", "people"],
                    }}
                    renderPanel={renderPanel}
                />
            </MiddleColumn>

            <LeftColumn>

            </LeftColumn>
        </main>
    )
}

export default ExploreTabList;