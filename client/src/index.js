import "./styles/App.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoadingProvider } from "./context/LoadingProvider";
import { AuthProvider } from "./context/AuthProvider";

import Root from "./routes/Root";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Home from "./routes/Home";
import ProtectedRoute from "./routes/ProtectedRoute";

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
        <LoadingProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </LoadingProvider>
    </React.StrictMode>
);
