import "./styles/App.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import Root from "./routes/Root";
import Login from "./routes/Login";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile";
import TabRoute from "./routes/TabRoute";
import Bookmarks from "./routes/Bookmarks";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import {
    ProfileTimeline,
    RepliesTimeline,
    MediaTimeline,
    LikesTimeline,
    UserFollowers,
    UserFollowings,
    QuoteEngagements,
    RepostEngagments,
    LikeEngagements,
} from "./components/index";

import store from "./app/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                index: true,
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path: "/home",
                element: (
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                ),
            },
            {
                path: "/:username",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
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
                        context={{
                            selector: { arg: "username", param: "username" },
                        }}
                    />
                ),
                children: [{ path: "", element: <UserFollowers /> }],
            },
            {
                path: "/:username/following",
                element: (
                    <TabRoute
                        tabs={["followers", "following"]}
                        context={{
                            selector: { arg: "username", param: "username" },
                        }}
                    />
                ),
                children: [{ path: "", element: <UserFollowings /> }],
            },

            {
                path: "/:username/status/:tweetId/quotes",
                element: (
                    <TabRoute
                        tabs={["quotes", "retweets", "likes"]}
                        context={{ selector: { arg: "id", param: "tweetId" } }}
                    />
                ),
                children: [{ path: "", element: <QuoteEngagements /> }],
            },
            {
                path: "/:username/status/:tweetId/retweets",
                element: (
                    <TabRoute
                        tabs={["quotes", "retweets", "likes"]}
                        context={{ selector: { arg: "id", param: "tweetId" } }}
                    />
                ),
                children: [{ path: "", element: <RepostEngagments /> }],
            },
            {
                path: "/:username/status/:tweetId/likes",
                element: (
                    <TabRoute
                        tabs={["quotes", "retweets", "likes"]}
                        context={{ selector: { arg: "id", param: "tweetId" } }}
                    />
                ),
                children: [{ path: "", element: <LikeEngagements /> }],
            },
            {
                path: "/bookmarks",
                element: (
                    <PrivateRoute>
                        <Bookmarks />
                    </PrivateRoute>
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
