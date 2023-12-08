import "./styles/App.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./routes/Login";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile";
import TabRoute from "./routes/TabRoute";

import {
    ProfileTimeline,
    RepliesTimeline,
    MediaTimeline,
    LikesTimeline,
    UserFollowers,
    UserFollowings,
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
                        element: <ProfileTimeline />,
                    },
                    {
                        path: "replies",
                        element: <RepliesTimeline />,
                    },
                    {
                        path: "media",
                        element: <MediaTimeline />,
                    },
                    {
                        path: "likes",
                        element: <LikesTimeline />,
                    },
                ],
            },
            {
                path: "/:username/followers",
                element: (
                    <TabRoute
                        tabs={["followers", "following"]}
                        context={{ selector: { arg: "username", param: "username" } }}
                    />
                ),
                children: [{ path: "", element: <UserFollowers /> }],
            },
            {
                path: "/:username/following",
                element: (
                    <TabRoute
                        tabs={["followers", "following"]}
                        context={{ selector: { arg: "username", param: "username" } }}
                    />
                ),
                children: [{ path: "", element: <UserFollowings /> }],
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
