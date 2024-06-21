import { baseApi } from "./baseApi";
import providesList from "../../helpers/providesList";

export const bookmarkApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBookmarks: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/bookmarks?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Bookmark"),
        }),
        createBookmark: builder.mutation({
            query: ({ userId, tweetId }) => ({
                url: `/users/${userId}/bookmarks`,
                method: "POST",
                body: {
                    tweetId,
                },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: "Bookmark" },
                { type: "User", id: userId },
            ],
        }),
        deleteBookmark: builder.mutation({
            query: ({ userId, tweetId }) => ({
                url: `/users/${userId}/bookmarks/${tweetId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: "Bookmark" },
                { type: "User", id: userId },
            ],
        }),
        deleteAllBookmarks: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}/bookmarks`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, userId) => [
                { type: "Bookmark" },
                { type: "User", id: userId },
            ],
        }),
    }),
});

export const {
    useDeleteAllBookmarksMutation,
    useGetBookmarksQuery,
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation
} = bookmarkApi;
