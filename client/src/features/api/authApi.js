import { baseApi } from "./baseApi";
import socketClient from "../../app/socketClient";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        checkAuth: builder.query({
            query: () => ({
                url: "/auth/me",
            }),
            providesTags: ["Auth"],
            // async onQueryStarted(arg, { queryFulfilled }) {
            //     await queryFulfilled
            //     socketClient.connect();
            // },
        }),
        signIn: builder.mutation({
            query: ({ identifier, password }) => ({
                url: "/auth/signin",
                method: "POST",
                body: {
                    identifier,
                    password,
                },
            }),
            invalidatesTags: ["Auth"],
        }),
        signUp: builder.mutation({
            query: (formData) => ({
                url: "/auth/signup",
                method: "POST",
                body: formData
            }),
        }),
        verifyToken: builder.mutation({
            query: ({ id, token }) => ({
                url: `/auth/verify/${id}/${token}`,
                method: "POST"
            }),
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
                const { data } = await cacheDataLoaded;

                if (data.isAuthenticated) {
                    dispatch(baseApi.util.invalidateTags(["Auth"]));
                }
            },
            invalidatesTags: ["Auth"],
        }),
        signOut: builder.query({
            query: () => ({
                url: "/auth/logout",
            }),
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
                // const isAuth = (await cacheDataLoaded).data?.isAuthenticated;

                // if (!isAuth) {
                //     socketClient.disconnect();
                //     dispatch(baseApi.util.resetApiState());
                // }
            },
        }),
        identifierExists: builder.query({
            query: (identifier) => ({
                url: `/auth/check-identifier/${identifier}?identifier=1`,
            }),
            transformResponse: (response) => response.exists,
        }),
        checkUsername: builder.query({
            query: (username) => ({
                url: `/auth/check-identifier/${username}?username=1`,
            }),
            transformResponse: (response) => response.exists,
        }),
        checkEmail: builder.query({
            query: (email) => ({
                url: `/auth/check-identifier/${email}?email=1`,
            }),
            transformResponse: (response) => response.exists,
        })
    }),
});

export const {
    useCheckAuthQuery,
    useIdentifierExistsQuery,
    useSignInMutation,
    useSignUpMutation,
    useLazyIdentifierExistsQuery,
    useLazyCheckUsernameQuery,
    useLazyCheckEmailQuery,
    useLazySignOutQuery,
    useVerifyTokenMutation,
    useLazyCheckAuthQuery
} = authApi;
