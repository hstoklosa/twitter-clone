import "../../../styles/PreviewList.css";

import React, { useEffect } from "react";
import {
    List,
    WindowScroller,
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
} from "react-virtualized";

import {
    useGetUserTweetsQuery,
    useGetUserRepliesQuery,
    useGetUserLikesQuery,
    useGetUserMediaQuery,
    useGetUserFollowersQuery,
    useGetUserFollowingQuery,
} from "../../../store/api/userApi";

import {
    useGetQuotesQuery,
    useGetRepostUsersQuery,
    useGetLikeUsersQuery,
} from "../../../store/api/tweetApi";

import withQuery from "../../../hoc/withQuery";
import Tweet from "../../twitter/Tweet";
import UserPreview from "../UserPreview";

import { Spinner, Placeholder, ErrorPlaceholder } from "../../index";

import placeholders from "../../../config/placeholders";

const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
});

const PreviewList = ({
    queryResult,
    handleChange,
    PreviewComponent = null,
    emptyPreviewText = {},
}) => {
    const { data, isLoading, isError, handleScroll } = queryResult;

    useEffect(() => {
        handleChange && handleChange(data);
    }, [data]);

    const renderPreview = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer
                key={key}
                parent={parent}
                cache={cache}
                rowIndex={index}
                columnIndex={0}
            >
                {({ registerChild }) => (
                    <div ref={registerChild}>
                        {data[index] && (
                            <PreviewComponent
                                key={index}
                                tweet={data[index]}
                                style={style}
                            />
                        )}
                    </div>
                )}
            </CellMeasurer>
        );
    };

    const renderEmptyPreview = () => (
        <Placeholder
            header={emptyPreviewText?.header || "Nothing to see here"}
            subheader={emptyPreviewText?.subheader || "Try again soon!"}
        />
    );

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorPlaceholder />;

    return (
        <section
            className="preview-list"
            id="preview-list"
        >
            <AutoSizer style={{ width: "100%", height: "unset" }}>
                {({ width }) => (
                    <WindowScroller>
                        {({ height, isScrolling, onChildScroll, scrollTop }) => (
                            <List
                                autoHeight
                                width={width}
                                height={height}
                                isScrolling={isScrolling}
                                scrollTop={scrollTop}
                                deferredMeasurementCache={cache}
                                rowRenderer={renderPreview}
                                noRowsRenderer={renderEmptyPreview}
                                rowCount={data.length}
                                rowHeight={cache.rowHeight}
                                onScroll={handleScroll}
                                onChildScroll={onChildScroll}
                            />
                        )}
                    </WindowScroller>
                )}
            </AutoSizer>
        </section>
    );
};

const withTweetQuery = (query, placeholder) => () =>
    withQuery(query, Tweet, placeholder)(PreviewList);

const withUserQuery = (query, placeholder) => () =>
    withQuery(query, UserPreview, placeholder)(PreviewList);

const ProfileTimeline = withTweetQuery(useGetUserTweetsQuery, placeholders.profileTimeline)();

const RepliesTimeline = withTweetQuery(useGetUserRepliesQuery, placeholders.repliesTimeline)();

const MediaTimeline = withTweetQuery(useGetUserMediaQuery, placeholders.mediaTimeline)();

const LikesTimeline = withTweetQuery(useGetUserLikesQuery, placeholders.likesTimeline)();

const UserFollowers = withUserQuery(useGetUserFollowersQuery, placeholders.followers)();

const UserFollowings = withUserQuery(useGetUserFollowingQuery, placeholders.followings)();

const QuoteEngagements = withTweetQuery(useGetQuotesQuery, placeholders.quoteEngagements)();

const RepostEngagments = withUserQuery(useGetRepostUsersQuery, placeholders.repostEngagements)();

const LikeEngagements = withUserQuery(useGetLikeUsersQuery, placeholders.likeEngagements)();

export {
    ProfileTimeline,
    RepliesTimeline,
    MediaTimeline,
    LikesTimeline,
    UserFollowers,
    UserFollowings,
    QuoteEngagements,
    RepostEngagments,
    LikeEngagements,
};

export default PreviewList;
