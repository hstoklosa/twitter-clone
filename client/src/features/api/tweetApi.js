import { baseApi } from "./baseApi";
import providesList from "../../helpers/providesList";

export const tweetApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTweet: builder.query({
            query: (id) => ({
                url: `/tweets/${id}`,
            }),
            providesTags: (result, err, id) => [{ type: "Post", id }],
            transformResponse: (response) => response.tweet,
        }),
        getReplies: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/tweets/${id}/replies?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "TWEET_REPLIES"),
        }),
        getHomeTimeline: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/users/${id}/home_timeline?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "HOME_FEED"),
        }),
        getTrendingKeywords: builder.query({
            query: ({ page, limit }) => ({
                url: `/tweets/trending/keywords?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Keyword", "TRENDING_KEYWORDS"),
        }),
        getTrendingTweets: builder.query({
            query: ({ page, limit }) => ({
                url: `/tweets/trending/content?page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "TRENDING_TWEETS"),
        }),
        getSearchTweets: builder.query({
            query: ({ searchQuery, page, limit }) => ({
                url: `/tweets/search/recent?query=${searchQuery}&page=${page}&limit=${limit}`,
            }),
            providesTags: (result) => providesList(result?.data, "Post", "SEARCH_TWEETS"),
        }),
        getQuotes: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/tweets/${id}/engagement?quotes=1&page=${page}&limit=${limit}`,
            }),
        }),
        getRepostUsers: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/tweets/${id}/engagement?retweets=1&page=${page}&limit=${limit}`,
            }),
        }),
        getLikeUsers: builder.query({
            query: ({ id, page, limit }) => ({
                url: `/tweets/${id}/engagement?likes=1&page=${page}&limit=${limit}`,
            }),
        }),
        createTweet: builder.mutation({
            query: (data) => ({
                url: "/tweets",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Post" }],
        }),
        deleteTweet: builder.mutation({
            query: (tweetId) => ({
                url: `/tweets/${tweetId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, tweetId) => [{ type: "Post", id: tweetId }],
        }),
        likeTweet: builder.mutation({
            query: ({ id, userId }) => ({
                url: `/tweets/${id}/like`,
                method: "POST",
                body: { userId }
            }),
            invalidatesTags: (result, error, { id, userId }) => [
                { type: "Post", id },
                { type: "User", userId }
            ],
        }),
        unlikeTweet: builder.mutation({
            query: ({ id, userId }) => ({
                url: `/tweets/${id}/like`,
                method: "DELETE",
                body: { userId }
            }),
            invalidatesTags: (result, error, { id, userId }) => [
                { type: "Post", id },
                { type: "User", userId }
            ],
        }),
    }),
});


export const {
    useGetTweetQuery,
    useGetHomeTimelineQuery,
    useCreateTweetMutation,
    useDeleteTweetMutation,
    useGetTrendingKeywordsQuery,
    useLazyGetTrendingTweetsQuery,
    useGetQuotesQuery,
    useGetRepostUsersQuery,
    useGetLikeUsersQuery,
    useGetTrendingTweetsQuery,
    useGetRepliesQuery,
    useGetSearchTweetsQuery,
    useLikeTweetMutation,
    useUnlikeTweetMutation,
} = tweetApi;