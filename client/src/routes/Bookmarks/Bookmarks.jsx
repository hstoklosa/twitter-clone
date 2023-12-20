import "./styles.css";
// import noBookmarksImage from "../../assets/no-bookmarks.png";

import { useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

import { useAppSelector } from "../../app/store";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import {
    ColumnHeader,
    MiddleColumn,
    LeftColumn,
    FloatOptions,
    PaginatedList,
    TweetPreview,
    Placeholder,
    Links,
} from "../../components";

import {
    useGetBookmarksQuery,
    useDeleteAllBookmarksMutation,
} from "../../features/api/userApi";


const Bookmarks = () => {
    const [moreFloat, setMoreFloat] = useState(false);
    const { user: currentUser } = useAppSelector((state) => state.auth);
    const queryResult = useInfiniteScroll(useGetBookmarksQuery, { id: currentUser.id })
    const [deleteAllBookmarks, clearResult] = useDeleteAllBookmarksMutation();

    const openMoreFloat = () => setMoreFloat(true);
    const closeMoreFloat = () => setMoreFloat(false);

    const handleBookmarkClear = () => {
        deleteAllBookmarks(currentUser.id);

        if (!clearResult.isError) {
            closeMoreFloat();
        }
    };

    return (
        <main>
            <MiddleColumn>
                <ColumnHeader className="bookmarks-header">
                    <div className="bookmarks-container">
                        <h1>Bookmarks</h1>
                        <p>@{currentUser.username}</p>
                    </div>

                    <div className="bookmarks-container">
                        <button
                            className="dark_round-btn"
                            onClick={openMoreFloat}
                        >
                            <div className="icon-container">
                                <IoEllipsisHorizontal className="icon" />
                            </div>

                            {moreFloat && (
                                <FloatOptions
                                    className="more-float"
                                    isOpen={moreFloat}
                                    onClose={closeMoreFloat}
                                >
                                    <button
                                        type="button"
                                        className="delete float-btn"
                                        onClick={handleBookmarkClear}
                                    >
                                        Clear all Bookmarks
                                    </button>
                                </FloatOptions>
                            )}
                        </button>
                    </div>
                </ColumnHeader>

                <PaginatedList
                    queryResult={queryResult}
                    component={TweetPreview}
                    renderPlaceholder={() => (
                        <Placeholder
                            title="Save Tweets for later"
                            subtitle="Don't let the good ones fly away! Bookmark Tweets to easily find them again in the future."
                        />
                    )}
                />
            </MiddleColumn>

            <LeftColumn>
                <Links />
            </LeftColumn>
        </main>
    );
};

export default Bookmarks;
