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

import withQuery from "../../../hoc/withQuery";
import Tweet from "../../twitter/Tweet";
import UserPreview from "../UserPreview";

import { Spinner, Placeholder, ErrorPlaceholder } from "../../index";

import {
    profileTimelineText,
    repliesText,
    mediaText,
    likesText,
    followersListText,
    followingListText,
} from "../../../config/placeholder";

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

const ProfileTimelineList = withTweetQuery(useGetUserTweetsQuery, profileTimelineText)();

const RepliesList = withTweetQuery(useGetUserRepliesQuery, repliesText)();

const MediaList = withTweetQuery(useGetUserMediaQuery, mediaText)();

const LikesList = withTweetQuery(useGetUserLikesQuery, likesText)();

const FollowersList = withUserQuery(useGetUserFollowersQuery, followersListText)();

const FollowingList = withUserQuery(useGetUserFollowingQuery, followingListText)();

export { ProfileTimelineList, RepliesList, MediaList, LikesList, FollowersList, FollowingList };

export default PreviewList;
