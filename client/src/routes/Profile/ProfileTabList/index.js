import { useOutletContext } from "react-router-dom";

import withQuery from "../../../hoc/withQuery";

import {
    useGetUserTweetsQuery,
    useGetUserLikesQuery,
    useGetUserMediaQuery,
    useGetUserRepliesQuery
} from "../../../features/api/userApi";

import { PaginatedList, PaginatedTabList, TweetPreview, Placeholder } from "../../../components";

const TimelineList = withQuery(useGetUserTweetsQuery)(PaginatedList);
const RepliesList = withQuery(useGetUserRepliesQuery)(PaginatedList);
const MediaList = withQuery(useGetUserMediaQuery)(PaginatedList);
const LikesList = withQuery(useGetUserLikesQuery)(PaginatedList);

const ProfileTabList = () => {
    const { args = {}, options = {}, index } = useOutletContext() || {};

    const renderPanel = (currTab) => {
        switch (currTab) {
            case 'tweets':
                return (
                    <TimelineList
                        component={TweetPreview}
                        args={args}
                        options={options}
                    />
                )
            case 'replies':
                return (
                    <RepliesList
                        component={TweetPreview}
                        args={args}
                        options={options}
                    />
                )
            case 'media':
                return (
                    <MediaList
                        component={TweetPreview}
                        renderPlaceholder={() => (
                            <Placeholder
                                title="The user hasn't posted media"
                                subtitle="Once they do, those posts will show up here."
                            />
                        )}
                        args={args}
                        options={options}
                    />
                )
            case 'likes':
                return (
                    <LikesList
                        component={TweetPreview}
                        renderPlaceholder={() => (
                            <Placeholder
                                title="The user hasn't liked any posts"
                                subtitle="When they do, those posts will show up here."
                            />
                        )}
                        args={args}
                        options={options}
                    />
                )
            default:
                break;
        }
    }

    return (
        <PaginatedTabList
            options={{
                tabs: ["tweets", "replies", "media", "likes"],
                index: index
            }}
            renderPanel={renderPanel}
        />
    )
}

export default ProfileTabList;