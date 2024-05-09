import { Link, useNavigate } from "react-router-dom";
import { FollowButton, PfpContainer } from "../../../index";

const ConnectItem = ({ user, isFollowed }) => {
    const { pathname } = useNavigate();

    return (
        <Link
            to={`/${user.username}`}
            state={{ previousPath: pathname }}
            className="widget-item connect-item"
        >
            <div className="simple-card truncate">
                <PfpContainer src={user.profileImageURL} />

                <div className="info-container truncate">
                    <h3 className="widget-item_header truncate">{user.displayName}</h3>
                    <span className="widget-item_subheader truncate">@{user.username}</span>
                </div>
            </div>

            <FollowButton
                targetUserId={user._id}
                targetUserName={user.username}
                isFollowing={isFollowed}
            />
        </Link>
    );
};

export default ConnectItem;