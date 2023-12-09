import { createSlice } from "@reduxjs/toolkit";

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
        // builder.addCase(checkAuth.pending, (state, action) => {
        //     state["auth/checkAuth"] = null;
        // });
    },
});

export const { actions: errorActions, reducer: errorReducer } = errorSlice;
