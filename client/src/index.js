import "./styles/App.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Root from "./routes/Root";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./routes/Login";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile";
import TabRoute from "./routes/TabRoute";

import {
    ProfileTimelineList,
    RepliesList,
    MediaList,
    LikesList,
    FollowingList,
    FollowersList,
} from "./components/index";

import store from "./store/index";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Login />,
                index: true,
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
                        <Profile />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "",
                        element: <ProfileTimelineList />,
                    },
                    {
                        path: "replies",
                        element: <RepliesList />,
                    },
                    {
                        path: "media",
                        element: <MediaList />,
                    },
                    {
                        path: "likes",
                        element: <LikesList />,
                    },
                ],
            },

            {
                path: "/:username/followers",
                element: <TabRoute tabs={["followers", "following"]} />,
                children: [
                    {
                        path: "",
                        element: <FollowersList />,
                    },
                ],
            },

            {
                path: "/:username/following",
                element: <TabRoute tabs={["followers", "following"]} />,
                children: [
                    {
                        path: "",
                        element: <FollowingList />,
                    },
                ],
            },

            {
                path: "/explore",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/notifications",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/messages",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/bookmarks",
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
