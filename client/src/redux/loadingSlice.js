import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, signIn } from "./authSlice";

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
            });
    },
});

export const { reducer: loadingReducer } = loadingSlice;
