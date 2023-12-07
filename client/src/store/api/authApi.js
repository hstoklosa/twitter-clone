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
            query: (user) => {
                const { displayName, username, email, password, day, month, year } = user;

                const dobDate = new Date(`${year}-${month}-${day}`);
                const dob = dobDate.toISOString().split("T")[0];

                return {
                    url: "/auth/signup",
                    method: "POST",
                    body: {
                        displayName,
                        username,
                        email,
                        password,
                        dob,
                    },
                };
            },
        }),
        signOut: builder.query({
            async queryFn(_arg, { dispatch }, _extraOptions, fetchWithBQ) {
                const signOut = await fetchWithBQ({ url: "/auth/logout" });

                if (!signOut?.data.isAuthenticated) {
                    dispatch(baseApi.util.resetApiState());
                }
            },
        }),
        identifierExists: builder.query({
            query: (identifier) => ({
                url: `/auth/check-identifier/${identifier}`,
            }),
            transformResponse: (response) => response.exists,
        }),
        receiveCode: builder.mutation({
            query: (email) => ({
                url: `/auth/confirm-email/${email}`,
            }),
        }),
    }),
});

export const {
    useCheckAuthQuery,
    useIdentifierExistsQuery,
    useSignInMutation,
    useSignUpMutation,
    useLazyIdentifierExistsQuery,
    useLazySignOutQuery,
    useReceiveCodeMutation,
} = authApi;
