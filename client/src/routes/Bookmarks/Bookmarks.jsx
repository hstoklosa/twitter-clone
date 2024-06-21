import "./styles.css";
// import noBookmarksImage from "../../assets/no-bookmarks.png";

import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoEllipsisHorizontal } from "react-icons/io5";

import { useAppSelector } from "../../app/store";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import {
    ColumnHeader,
    MiddleColumn,
    LeftColumn,
    PaginatedList,
    TweetPreview,
    Placeholder,
    Float,
    Trending,
    Connect,
    SearchBar,
    Links,
} from "../../components";

import {
    useGetBookmarksQuery,
    useDeleteAllBookmarksMutation,
} from "../../features/api/bookmarkApi";

import useModal from "../../hooks/useModal";
import { useAppDispatch } from "../../app/store";
import { modalActions } from "../../features/slices/modalSlice";

const _title = "Clear all Bookmarks?"
const _desc = "This can't be undone and you'll remove all posts you've added to your Bookmarks.";

const Bookmarks = () => {

    const {
        isOpen: isBookmarkFloatOpen,
        open: openBookmarkFloat,
        close: closeBookmarkFloat
    } = useModal();

    const { user: currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [deleteAllBookmarks, clearResult] = useDeleteAllBookmarksMutation();

    const handleBookmarkClear = () => {
        deleteAllBookmarks(currentUser.id);

        if (!clearResult.isError) {
            closeBookmarkFloat();
        }
    };

    return (
        <main>
            <Helmet>
                <title>Bookmarks / X</title>
            </Helmet>

            <MiddleColumn>
                <ColumnHeader className="bookmarks-header" routerBack={true}>
                    <div className="bookmarks-title">
                        <h1>Bookmarks</h1>
                        <p>@{currentUser.username}</p>
                    </div>

                    <div className="bookmarks-container">
                        <Float
                            isOpen={isBookmarkFloatOpen}
                            open={openBookmarkFloat}
                            close={closeBookmarkFloat}
                            positions={["bottom"]}
                            className="more-float"
                            align="end"
                            renderContent={() => (
                                <button
                                    type="button"
                                    className="delete float-btn"
                                    onClick={() => dispatch(modalActions.openModal({
                                        name: "ActionModal",
                                        props: {
                                            title: _title,
                                            description: _desc,
                                            mainBtnLabel: "Clear",
                                            focusOnMainBtn: true,
                                            action: handleBookmarkClear
                                        }
                                    }))}
                                >
                                    Clear all Bookmarks
                                </button>
                            )}
                        >
                            <button
                                className="dark_round-btn"
                                onClick={openBookmarkFloat}
                            >
                                <div className="icon-container">
                                    <IoEllipsisHorizontal className="icon" />
                                </div>
                            </button>

                        </Float>
                    </div>
                </ColumnHeader>

                <PaginatedList
                    queryHook={useGetBookmarksQuery}
                    args={{ id: currentUser.id }}
                    renderItem={(data) => <TweetPreview tweet={data} />}
                    renderPlaceholder={() => (
                        <Placeholder
                            title="Save Tweets for later"
                            subtitle="Don't let the good ones fly away! Bookmark Tweets to easily find them again in the future."
                        />
                    )}
                />
            </MiddleColumn>

            <LeftColumn>
                <SearchBar />
                <Trending />
                <Connect />
                <Links />
            </LeftColumn>
        </main >
    );
};

export default Bookmarks;
