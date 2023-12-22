import "./styles/App.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "./contexts/ThemeProvider.jsx"

import { AppLayout } from "./components";

import Root from "./routes/Root";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import ProfileTabList from "./routes/Profile/ProfileTabList";
import ProfileConnections from "./routes/Profile/ProfileConnections";
import Tweet from "./routes/Tweet";
import TweetEngagements from "./routes/Tweet/TweetEngagements";
import Bookmarks from "./routes/Bookmarks";
import Explore from "./routes/Explore";
import ExploreTabList from "./routes/Explore/ExploreTabList";
import Search from "./routes/Search";

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


                    {
                        path: "/:username/status/:tweetId",
                        element: (
                            <PrivateRoute>
                                <Tweet />
                            </PrivateRoute>
                        ),
                    },
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
                    {
                        path: "/explore",
                        element: (
                            <PrivateRoute>
                                <Explore />
                            </PrivateRoute>
                        ),
                        children: [
                        ],
                    },
                    ...[
                        '/explore/tweets',
                        '/explore/people',
                    ].map(path => ({
                        path: path,
                        element: <ExploreTabList />
                    })),


                    {
                        path: "/search",
                        element: (
                            <PrivateRoute>
                                <Search />
                            </PrivateRoute>
                        ),
                        children: [
                            ...[
                                '/search/tweets',
                                '/search/people',
                            ].map(path => ({
                                path: path,
                                element: (
                                    <PrivateRoute>
                                        <Search />
                                    </PrivateRoute>
                                )
                            })),
                        ],
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
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </React.StrictMode >
);
