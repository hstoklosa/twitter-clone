import "./styles.css";

import { useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

import usePagination from "../../hooks/usePagination";

import { useCheckAuthQuery } from "../../features/api/authApi";
import {
    useGetBookmarksQuery,
    useDeleteAllBookmarksMutation,
} from "../../features/api/userApi";

import {
    ColumnHeader,
    MiddleColumn,
    LeftColumn,
    FloatOptions,
    PreviewList,
    Tweet,
    Links,
} from "../../components";

import placeholders from "../../config/placeholders";

const Bookmarks = () => {
    const [moreFloat, setMoreFloat] = useState(false);

    const {
        data: { data: currentUser },
    } = useCheckAuthQuery();

    const queryResult = usePagination(useGetBookmarksQuery, {
        id: currentUser.id,
    });

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

                <PreviewList
                    queryResult={queryResult}
                    PreviewComponent={Tweet}
                    placeholder={placeholders.bookmarks}
                />
            </MiddleColumn>

            <LeftColumn>
                <Links />
            </LeftColumn>
        </main>
    );
};

export default Bookmarks;
