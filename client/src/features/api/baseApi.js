import { createApi } from "@reduxjs/toolkit/query/react";

const customBaseQuery =
    ({ baseUrl } = { baseUrl: process.env.REACT_APP_API_URL }) =>
        async (
            { url, method = "GET", headers = {}, body = null },
            api,
            extraOptions
        ) => {
            const options = {
                method,
                headers,
                credentials: "include",
            };

            // adjust headers and body based on the request
            if (body && method !== "GET" && method !== "HEAD") {
                if (body instanceof FormData) {
                    options.body = body;
                } else {
                    options.body = JSON.stringify(body);
                    headers["Content-Type"] = "application/json";
                }
            }

            // fetches and parses JSON response to an object
            const response = await fetch(baseUrl + url, options);
            const result = await response.json();

            // backend error
            if (result.error) {
                // user not authenticated
                // if (result.error.status === 401) {
                //     return { data: { isAuthenticated: false } };
                // }

                return {
                    error: {
                        status: result.error.status,
                        message: result.error.message,
                    },
                };
            }

            return {
                data: result,
            };
        };



export const baseApi = createApi({
    baseQuery: customBaseQuery(),
    reducerPath: "baseApi",
    tagTypes: ["Auth", "User", "Post", "UserWidget", "Bookmark"],
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({}),
});
