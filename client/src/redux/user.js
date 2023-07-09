const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    auth: {},
    feed: {},
};

// Actions
export const login = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const logout = () => {
    return {
        type: "LOGOUT_SUCCESS",
    };
};

// Reducer
export const counter = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
};
