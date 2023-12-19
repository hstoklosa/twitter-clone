import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signUpModal: false,
    signInModal: false,
    verificationModal: {
        isOpen: false,
        userId: "",
    },
};

const modalSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        enableSignUpModal(state) {
            state.signUpModal = true;
        },
        disableSignUpModal(state) {
            state.signUpModal = false;
        },
        enableSignInModal(state) {
            state.signInModal = true;
        },
        disableSignInModal(state) {
            state.signInModal = false;
        },
        enableVerificationModal(state, { payload }) {
            state.verificationModal.isOpen = true;
            state.verificationModal.userId = payload.userId;
        },
        disableVerificationModal(state) {
            state.verificationModal.isOpen = false;
        },
    },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
