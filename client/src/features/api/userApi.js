import { baseApi } from "./baseApi";
import providesList from "../../helpers/providesList";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: (identifier) => ({
                url: `/users/${identifier}`,
            }),
            providesTags: (result, err, arg) =>
                result
                    ? [
                        {
                            type: "User",
                            id: result._id,
                        },
                    ]
                    : ["User"],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                {
                    type: "User",
                    id: arg.id,
                },
            ],
        }),
        getBookmarks: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/bookmarks?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "BOOKMARKS"),
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
                { type: "Post", id: "BOOKMARKS" },
                { type: "User", id: userId },
            ],
        }),
        deleteBookmark: builder.mutation({
            query: ({ userId, tweetId }) => ({
                url: `/users/${userId}/bookmarks/${tweetId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: "Post", id: "BOOKMARKS" },
                { type: "User", id: userId },
            ],
        }),
        deleteAllBookmarks: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}/bookmarks`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, userId) => [
                { type: "User", id: userId },
            ],
        }),
        getUserFollowers: builder.query({
            query: ({ username, page, limit }) => ({
                url: `/users/${username}/followers?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: (result) => providesList(result?.data, "User", "FOLLOWERS"),
        }),
        getUserFollowing: builder.query({
            query: ({ username, page, limit }) => ({
                url: `/users/${username}/following?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: (result) => providesList(result?.data, "User", "FOLLOWING"),
        }),
        getUserTweets: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/timeline?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "TIMELINE"),
        }),
        getUserReplies: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/replies?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "REPLIES"),
        }),
        getUserLikes: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/likes?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "LIKES"),
        }),
        getUserMedia: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/media?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "MEDIA"),
        }),
        followUser: builder.mutation({
            query: ({ id, targetUserId }) => ({
                url: `/users/${id}/following`,
                method: "PUT",
                body: {
                    targetUserId,
                },
            }),
            invalidatesTags: (result, error, { id, targetUserId }) => [
                { type: "User", id },
                { type: "User", id: targetUserId },
                { type: "User", id: "FOLLOWING" },
                { type: "User", id: "FOLLOWERS" },
                { type: "Post", id: "HOME_FEED" },
                { type: "User", id: "RECOMMENDED" }
            ],
        }),
        unfollowUser: builder.mutation({
            query: ({ id, targetUserId }) => ({
                url: `/users/${id}/following`,
                method: "DELETE",
                body: {
                    targetUserId,
                },
            }),
            invalidatesTags: (result, error, { id, targetUserId }) => [
                { type: "User", id },
                { type: "User", id: targetUserId },
                { type: "User", id: "FOLLOWING" },
                { type: "User", id: "FOLLOWERS" },
                { type: "Post", id: "HOME_FEED" },
                { type: "User", id: "RECOMMENDED" }
            ],
        }),
        createRepost: builder.mutation({
            query: ({ tweetId }) => ({
                url: `/tweets/${tweetId}/repost`,
                method: "POST",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),
        deleteRepost: builder.mutation({
            query: ({ tweetId }) => ({
                url: `/tweets/${tweetId}/repost`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),

        likeTweet: builder.mutation({
            query: ({ id }) => ({
                url: `/tweets/${id}/like`,
                method: "POST",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),
        unlikeTweet: builder.mutation({
            query: ({ id }) => ({
                url: `/tweets/${id}/like`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),
    }),
});

export const {
    useGetUserInfoQuery,
    useGetUserTweetsQuery,
    useGetUserFollowersQuery,
    useGetUserFollowingQuery,
    useUpdateUserMutation,
    useFollowUserMutation,
    useUnfollowUserMutation,
    useLikeTweetMutation,
    useUnlikeTweetMutation,
    useGetUserLikesQuery,
    useGetUserRepliesQuery,
    useGetUserMediaQuery,
    useCreateRepostMutation,
    useDeleteRepostMutation,
    useDeleteAllBookmarksMutation,
    useGetBookmarksQuery,
    useCreateBookmarkMutation,
    useDeleteBookmarkMutation,
} = userApi;
