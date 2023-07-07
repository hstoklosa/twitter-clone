import React, { createContext, useReducer, useContext } from "react";

// Define our loading context
const LoadingContext = createContext();

// Define our loading reducer
const loadingReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                [action.payload.name]: action.payload.isLoading,
            };
        default:
            return state;
    }
};

// Create a provider for our context
export const LoadingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loadingReducer, {});

    return <LoadingContext.Provider value={{ loadingState: state, loadingDispatch: dispatch }}>{children}</LoadingContext.Provider>;
};

// Custom hook to use the Loading context
export const useLoading = () => useContext(LoadingContext);
