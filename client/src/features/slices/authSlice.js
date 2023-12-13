import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const initialState = {
    isAuth: false,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut(state) {
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.checkAuth.matchFulfilled,
            (state, { payload }) => {
                state.isAuth = true;
                state.user = payload.data;
            }
        );
        builder.addMatcher(
            authApi.endpoints.signUp.matchFulfilled,
            (state, { payload }) => {
                state.isAuth = true;
                state.user = payload.data;
            }
        );
        builder.addMatcher(
            authApi.endpoints.signIn.matchFulfilled,
            (state, { payload }) => {
                state.isAuth = true;
                state.user = payload.data;
            }
        );
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
