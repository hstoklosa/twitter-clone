import "./styles.css";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

import { useAppSelector } from "../../app/store";
import useConditionalRender from "../../hooks/useConditionalRender";

import { useGetUserInfoQuery, useGetRecommendedUsersQuery } from "../../features/api/userApi";
import { useGetTrendingKeywordsQuery, useGetTrendingTweetsQuery } from "../../features/api/tweetApi";

import {
    LeftColumn,
    MiddleColumn,
    ColumnHeader,
    PaginatedList,
    TweetPreview,
    TrendingItem,
    ConnectItem,
    SearchBar,
    Links
} from "../../components";


const Explore = () => {
    const authState = useAppSelector((state) => state.auth);

    const { data: currentUser } = useGetUserInfoQuery(authState.user?.username, {
        skip: !authState.user?.username,
    });

    const {
        data: recommendedUsers,
        isFetching: isFetchingUsers,
        isError: isErrorUsers
    } = useGetRecommendedUsersQuery({ id: authState.user.id, page: 1, limit: 5 });

    const {
        data: trendingHashtags,
        isFetching: isFetchingHashtags,
        isError: isErrorHashtags
    } = useGetTrendingKeywordsQuery({ page: 1, limit: 10 });

    const usersContent = useConditionalRender({
        isError: isErrorUsers,
        isFetching: isFetchingUsers,
        data: recommendedUsers?.data,
        renderFunc: (user, idx) => (
            <ConnectItem
                key={idx}
                user={user}
                isFollowed={currentUser.following.includes(user._id)}
            />
        ),
    });

    // console.log(recommendedUsers)

    const trendingContent = useConditionalRender({
        isError: isErrorHashtags,
        isFetching: isFetchingHashtags,
        data: trendingHashtags?.data,
        renderFunc: (trend, idx) => (
            <TrendingItem
                key={idx}
                trend={trend}
            />
        ),
    });

    return (
        <main className="explore-route">
            <Helmet>
                <title>Explore / X</title>
            </Helmet>

            <MiddleColumn>
                <ColumnHeader
                    className="explore-route_header"
                    sidebarButton={true}
                >
                    <SearchBar defaultSearch={true} />
                </ColumnHeader>


                {recommendedUsers?.data.length > 0 && (
                    <section className="explore-users">
                        <div className="explore-section-header">
                            <h2>Explore connections</h2>
                            <p>Check out these recommended users for you</p>
                        </div>

                        <div className="explore-users_content">
                            {usersContent}
                        </div>

                        <Link
                            to={`/explore/people`}
                            state={{ previousPath: "/explore" }}
                            className="explore-route_more-btn"
                        >
                            Show more
                        </Link>

                    </section>
                )}

                {trendingHashtags?.data.length > 0 && (
                    <>
                        <section className="explore-tweets">
                            <div className="explore-section-header">
                                <h2>Trending Hashtags</h2>
                                <p>Check out these trending tweets</p>
                            </div>

                            <div className="explore-tweets_content">
                                {trendingContent}
                            </div>
                        </section>


                        <section className="explore-tweets">
                            <div className="explore-section-header"
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center"
                                }}>
                                <HiChatBubbleOvalLeftEllipsis
                                    size="21"
                                    style={{
                                        fill: "var(--primary-colour)",
                                    }}
                                />
                                <h2 style={{
                                    marginLeft: "0.75rem",
                                    fontSize: "1.2rem",
                                    fontWeight: "800"
                                }}>
                                    Trending Tweets
                                </h2>
                            </div>

                            <PaginatedList
                                queryHook={useGetTrendingTweetsQuery}
                                renderItem={(data) => <TweetPreview tweet={data} />}
                            />
                        </section>
                    </>
                )}
            </MiddleColumn>

            <LeftColumn>
                <Links />
            </LeftColumn>
        </main >
    );
};

export default Explore;
