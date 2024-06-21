import "./styles.css";

import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "@uidotdev/usehooks";
import { BiCog } from "react-icons/bi";

import { useAppSelector, useAppDispatch } from "../../app/store";
import { modalActions } from "../../features/slices/modalSlice";
import { useGetHomeTimelineQuery } from "../../features/api/tweetApi";

import {
    MiddleColumn,
    LeftColumn,
    ColumnHeader,
    TweetForm,
    PaginatedList,
    TweetPreview,
    SearchBar,
    Placeholder,
    Links,
    Trending,
    Connect,
} from "../../components";


const Home = () => {
    const { user: currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

    return (
        <main>
            <Helmet>
                <title>Home / X</title>
            </Helmet>

            <MiddleColumn className="home-route">
                <ColumnHeader className="home-column-header" sidebarButton={true}>
                    <h1>Home</h1>

                    <button
                        className="dark_round-btn"
                        onClick={() => dispatch(modalActions.openModal(
                            { name: "EditUsernameModal" }
                        ))}
                        data-tooltip-id="action-tooltip"
                        data-tooltip-content="Change your username"
                    >
                        <div className="icon-container">
                            <BiCog
                                size="20"
                                className="icon"
                            />
                        </div>
                    </button>
                </ColumnHeader>

                <TweetForm maxLength={280} showPfp={!isSmallDevice} />

                <PaginatedList
                    queryHook={useGetHomeTimelineQuery}
                    args={{ id: currentUser.id }}
                    component={TweetPreview}
                    renderItem={(data) => <TweetPreview tweet={data} />}
                    renderPlaceholder={() => (
                        <Placeholder
                            title="No tweets found"
                            subtitle="Try following some people!"
                        >
                            <Link to={`/explore`} className="accent-btn">Explore</Link>
                        </Placeholder>
                    )}
                />
            </MiddleColumn>

            <LeftColumn>
                <SearchBar defaultSearch={true} />
                <Connect />
                <Trending />
                <Links />
            </LeftColumn>
        </main >
    );
};

export default Home;
