import "./styles/App.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "../src/context/AuthProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root";
import Login from "./routes/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>TODO</h1>,
        children: [
            {
                path: "/",
                element: <Login />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
