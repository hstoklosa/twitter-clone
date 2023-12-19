import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        checkAuth: builder.query({
            query: () => ({
                url: "/auth/me",
            }),
            providesTags: () => [{ type: "Auth" }],
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
            invalidatesTags: () => [{ type: "Auth" }],
        }),
        signUp: builder.mutation({
            query: (formData) => ({
                url: "/auth/signup",
                method: "POST",
                body: formData
            }),
        }),
        verifyToken: builder.query({
            query: ({ id, token }) => ({
                url: `/auth/verify/${id}/${token}`,
            }),
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
                const data = await cacheDataLoaded;

                if (data.data?.isAuthenticated) {
                    dispatch(baseApi.endpoints["checkAuth"].initiate());
                }
            },
        }),
        signOut: builder.query({
            query: () => ({
                url: "/auth/logout",
            }),
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
                const data = await cacheDataLoaded;

                if (!data?.isAuthenticated)
                    dispatch(baseApi.util.resetApiState());
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
    useLazyVerifyTokenQuery,
} = authApi;
