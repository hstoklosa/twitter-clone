import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, checkIdentifier, signIn, signUp } from "./authSlice";

const errorSlice = createSlice({
    name: "error",
    initialState: {},
    reducers: {
        setError(state, action) {
            state[action.payload.path] = action.payload.error;
        },
        clearError: (state, action) => {
            console.log("err: ", action.payload);
            state[action.payload] = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state, action) => {
                state["auth/checkAuth"] = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state["auth/checkAuth"] = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state["auth/checkAuth"] = action.payload;
            })
            .addCase(checkIdentifier.pending, (state, action) => {
                state["auth/checkIdentifier"] = null;
            })
            .addCase(checkIdentifier.fulfilled, (state, action) => {
                state["auth/checkIdentifier"] = null;
            })
            .addCase(checkIdentifier.rejected, (state, action) => {
                state["auth/checkIdentifier"] = action.payload;
            })
            .addCase(signIn.pending, (state, action) => {
                state["auth/signIn"] = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state["auth/signIn"] = null;
            })
            .addCase(signIn.rejected, (state, action) => {
                state["auth/signIn"] = action.payload;
            })
            .addCase(signUp.pending, (state, action) => {
                state["auth/signUp"] = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state["auth/signUp"] = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state["auth/signUp"] = action.payload;
            });
    },
});

export const { actions: errorActions, reducer: errorReducer } = errorSlice;
