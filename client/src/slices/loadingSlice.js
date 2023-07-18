import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, signUp, signIn } from "./authSlice";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state, action) => {
                state["auth/checkAuth"] = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state["auth/checkAuth"] = false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state["auth/checkAuth"] = false;
            })
            .addCase(signUp.pending, (state, action) => {
                state["auth/signUp"] = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state["auth/signUp"] = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state["auth/signUp"] = false;
            })
            .addCase(signIn.pending, (state, action) => {
                state["auth/signIn"] = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state["auth/signIn"] = false;
            })
            .addCase(signIn.rejected, (state, action) => {
                state["auth/signIn"] = false;
            });
    },
});

export const { reducer: loadingReducer } = loadingSlice;
