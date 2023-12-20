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
    }),
});

export const {
    useGetTweetQuery,
    useGetHomeTimelineQuery,
    useCreateTweetMutation,
    useDeleteTweetMutation,
    useGetQuotesQuery,
    useGetRepostUsersQuery,
    useGetLikeUsersQuery,
} = tweetApi;
