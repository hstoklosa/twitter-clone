import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    form: {
        displayName: "",
        email: "",
        password: "",
        username: "",
    },
    error: {
        displayName: null,
        email: null,
        password: null,
        username: null,
    },
    token: "",
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        updateForm(state, { payload }) {
            state.form[payload.name] = payload.value;
        },
        clearForm(state) {
            state.form = initialState.form;
            state.error = initialState.error;
        },
        setError(state, { payload }) {
            state.error[payload.name] = payload.value;
        },
        clearError(state, { payload }) {
            state.error[payload] = null;
        },
        clearErrors(state) {
            state.error = initialState.error;
        },
        updateToken(state, { payload }) {
            state.token = payload.value;
        },
        clearToken(state) {
            state.token = initialState.token;
        }
    },
    extraReducers: (builder) => {
        // builder.addMatcher(
        //     authApi.endpoints.checkIdentifier.matchFulfilled,
        //     (state, { payload }) => {
        //         state.isAuth = true;
        //         state.user = payload.data;
        //     }
        // );
        //     // builder.addCase(checkAuth.pending, (state, action) => {
        //     //     state["auth/checkAuth"] = null;
        //     // });
    },
});

export const registerActions = registerSlice.actions;

export default registerSlice.reducer;
