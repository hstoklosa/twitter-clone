import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "../features/api/baseApi";

const middleware = (getDefaultMiddleware) => getDefaultMiddleware().prepend([baseApi.middleware]);

const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
};

const store = configureStore({
    reducer: reducer,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
