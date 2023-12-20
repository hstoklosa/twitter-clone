import "./styles.css";
import "../../common/BaseWidget/styles.css";

import { Link } from "react-router-dom";
import { IoEllipsisHorizontal } from "react-icons/io5";

import { useGetTrendingKeywordsQuery } from "../../../features/api/tweetApi";
import { BaseWidget, LinkButton } from "../../index";

export const TrendingItem = ({ trend }) => (
    <Link
        to={`/search?q=Copilot&src=trend_click&vertical=trends`}
        className="widget-item trending-item"
    >
        <div className="subheader_container">
            <span className="widget-item_subheader">Trending</span>

            <LinkButton
                className="blue_round-btn"
                disabled
            >
                <div className="icon-container">
                    <IoEllipsisHorizontal
                        className="icon"
                        size="14"
                    />
                </div>
            </LinkButton>
        </div>

        <h3 className="widget-item_header">#{trend.hashtag}</h3>
        <span className="widget-item_subheader">{trend.count} posts</span>
    </Link>
);

const Trending = () => {
    const { data, isLoading, isError } = useGetTrendingKeywordsQuery({ page: 1, limit: 5 });

    const renderData = () => {
        return data.map((trend, idx) => (
            <TrendingItem
                key={idx}
                trend={trend}
            />
        ));
    };

    return (
        <BaseWidget
            className="trending"
            title="What's happening"
            redirectTo={`/explore`}
            isLoading={isLoading}
            isError={isError}
            renderData={renderData}
        />
    );
};

export default Trending;
