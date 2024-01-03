import { useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "../features/api/baseApi";
import modalReducer from "../features/slices/modalSlice";
import authReducer from "../features/slices/authSlice";
import loginReducer from "../features/slices/loginSlice";
import registerReducer from "../features/slices/registerSlice";

const middleware = (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend([
        baseApi.middleware,
    ]);

const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    modal: modalReducer,
    auth: authReducer,
    login: loginReducer,
    register: registerReducer,
};

const store = configureStore({
    reducer: reducer,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== "production",
});

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

export default store;
