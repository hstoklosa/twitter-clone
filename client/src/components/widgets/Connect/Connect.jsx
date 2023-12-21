import "./styles.css";
import "../../common/BaseWidget/styles.css";

import { Link, useNavigate } from "react-router-dom";

import { useCheckAuthQuery } from "../../../features/api/authApi";
import { useGetRecommendedUsersQuery } from "../../../features/api/userApi";

import { BaseWidget, FollowButton } from "../../index";

export const ConnectItem = ({ user, isFollowed }) => {
    const { pathname } = useNavigate();

    return (
        <Link
            to={`/${user.username}`}
            state={{ previousPath: pathname }}
            className="widget-item connect-item"
        >
            <div className="simple-card">
                <div className="pfp-container">
                    <img
                        src={user.profileImageURL}
                        className="pfp"
                        alt="User Pfp"
                    />
                </div>

                <div className="info-container">
                    <h3 className="widget-item_header">{user.displayName}</h3>
                    <span className="widget-item_subheader">@{user.username}</span>
                </div>
            </div>

            <FollowButton
                targetUserId={user._id}
                isFollowing={isFollowed}
            />
        </Link>
    );
};

const Connect = () => {
    const {
        data: { data: currentUser },
    } = useCheckAuthQuery();

    const {
        data: { data = [] } = {},
        isLoading,
        isError,
    } = useGetRecommendedUsersQuery(
        { id: currentUser.id, page: 1, limit: 3 },
        { skip: !currentUser.id, }
    );



    const renderData = () => {
        return data.map((user, idx) => (
            <ConnectItem
                key={idx}
                user={user}
                isFollowed={
                    user.followers.includes(currentUser.id)
                }
            />
        ));
    };

    return (
        <BaseWidget
            className="connect-list"
            title="Who to follow"
            redirectTo={`/explore/people`}
            isEmpty={data.length === 0}
            isLoading={isLoading}
            isError={isError}
            renderData={renderData}
        />
    );
};

export default Connect;
