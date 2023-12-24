import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components";

import Root from "./Root";
import NotFound from "./NotFound";
import Auth from "./Auth";
import Home from "./Home";
import Profile from "./Profile";
import ProfileTabList from "./Profile/ProfileTabList";
import ProfileConnections from "./Profile/ProfileConnections";
import Tweet from "./Tweet";
import TweetEngagements from "./Tweet/TweetEngagements";
import Bookmarks from "./Bookmarks";
import Explore from "./Explore";
import ExploreTabList from "./Explore/ExploreTabList";
import Search from "./Search";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


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
                        <Auth />
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

export default router;