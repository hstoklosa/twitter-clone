import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    componentName: null,
    componentProps: {},
    mobileSidebar: false,
    verificationModal: {
        isOpen: false,
        userId: null,
    },
};

const modalSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        openModal(state, action) {
            state.isOpen = true;
            state.componentName = action.payload.name;
            state.componentProps = action.payload.props;
        },
        closeModal(state, action) {
            state.isOpen = false;
            state.componentName = null;
            state.componentProps = {};
        },
        enableVerificationModal(state, { payload }) {
            state.verificationModal.isOpen = true;
            state.verificationModal.userId = payload.userId;
        },
        disableVerificationModal(state) {
            state.verificationModal.isOpen = false;
            state.verificationModal.userId = null;
        },
        enableMobileSidebar(state) {
            state.mobileSidebar = true;
        },
        disableMobileSidebar(state) {
            state.mobileSidebar = false;
        },
    },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
