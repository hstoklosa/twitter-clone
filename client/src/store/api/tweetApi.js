import { baseApi } from "./baseApi";

export const tweetApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTweet: builder.query({
            query: (id) => ({
                url: `/tweets/${id}`,
            }),
            providesTags: (result, err, id) => [{ type: "Post", id }],
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

export const { useGetTweetQuery, useCreateTweetMutation, useDeleteTweetMutation } = tweetApi;
