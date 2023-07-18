import "./styles/App.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slices/authSlice";
import { loadingReducer } from "./slices/loadingSlice";
import { errorReducer } from "./slices/errorSlice";

import Root from "./routes/Root";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Home from "./routes/Home";
import ProtectedRoute from "./routes/ProtectedRoute";

const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
        error: errorReducer,
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                index: true,
                element: <Login />,
            },
            {
                path: "/home",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/:username",
                element: (
                    <ProtectedRoute>
                        <h1>TBC</h1>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/explore",
                element: (
                    <ProtectedRoute>
                        <h1>TBC</h1>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/notifications",
                element: (
                    <ProtectedRoute>
                        <h1>TBC</h1>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/messages",
                element: (
                    <ProtectedRoute>
                        <h1>TBC</h1>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/bookmarks",
                element: (
                    <ProtectedRoute>
                        <h1>TBC</h1>
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
