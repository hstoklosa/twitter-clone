import "./styles/App.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/authSlice";
import { loadingReducer } from "./redux/loadingSlice";

import Root from "./routes/Root";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Home from "./routes/Home";
import ProtectedRoute from "./routes/ProtectedRoute";

const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
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
