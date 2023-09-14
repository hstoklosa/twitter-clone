import { configureStore } from "@reduxjs/toolkit";

import { errorReducer } from "./slices/errorSlice";
import { baseApi } from "./api/baseApi";

const store = configureStore({
    reducer: {
        error: errorReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend([baseApi.middleware]),
});

export default store;
