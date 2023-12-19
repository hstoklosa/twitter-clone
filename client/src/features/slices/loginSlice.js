import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    form: {
        identifier: "",
        password: "",
    },
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        updateForm(state, { payload }) {
            state.form[payload.name] = payload.value;
        },
        clearForm(state) {
            state.form = initialState.form;
        },
    },
    // extraReducers: (builder) => {
    //     // builder.addCase(checkAuth.pending, (state, action) => {
    //     //     state["auth/checkAuth"] = null;
    //     // });
    // },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
