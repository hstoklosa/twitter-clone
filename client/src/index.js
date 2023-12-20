import "./styles/App.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { AppLayout } from "./components";

import Root from "./routes/Root";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import ProfileTabList from "./routes/Profile/ProfileTabList";
import ProfileConnections from "./routes/Profile/ProfileConnections";
import TweetEngagements from "./routes/Tweet/TweetEngagements";
import Bookmarks from "./routes/Bookmarks";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import store from "./app/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path: "/",
                element: <AppLayout />,
                children: [
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
                            ...[
                                '',
                                'replies',
                                'media',
                                'likes'
                            ].map(path => ({
                                path: path,
                                element: <ProfileTabList />
                            }))
                        ],
                    },
                    ...[
                        '/:username/followers',
                        '/:username/following'
                    ].map(path => ({
                        path: path,
                        element: <ProfileConnections />
                    })),

                    ...[
                        '/:username/status/:tweetId/quotes',
                        '/:username/status/:tweetId/reposts',
                        '/:username/status/:tweetId/likes'
                    ].map(path => ({
                        path: path,
                        element: <TweetEngagements />
                    })),
                    {
                        path: "/bookmarks",
                        element: (
                            <PrivateRoute>
                                <Bookmarks />
                            </PrivateRoute>
                        ),
                    },
                ]
            },
            {
                path: "*",
                element: <NotFound />,
            }
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
