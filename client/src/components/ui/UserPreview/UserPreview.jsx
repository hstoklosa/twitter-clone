import "./styles.css";
import "../../../routes/Profile/styles.css";

import { Link } from "react-router-dom";
import { FollowButton } from "../../index";
import { useAppSelector } from "../../../app/store";
import { useGetUserInfoQuery } from "../../../features/api/userApi";

const UserPreview = ({ user = null }) => {
    const authState = useAppSelector((state) => state.auth);

    const { data: currentUser } = useGetUserInfoQuery(authState.user?.username, {
        skip: !authState.user?.username,
    });

    const isFollowing = currentUser?.following.includes(user._id);
    const isFollowed = currentUser?.followers.includes(user._id);

    return (
        <Link className="user-card" to={`/${user.username}`}>
            <div className="user-card_pfp">
                <img
                    src={user.profileImageURL}
                    alt="User Pfp"
                />
            </div>

            <div className="user-card_details">
                <div className="row-1">
                    <div className="details">
                        <h3>{user.displayName}</h3>
                        <div className="details-container">
                            <p>@{user.username}</p>
                            {isFollowed && <div className="followed-sign">Follows you</div>}
                        </div>
                    </div>

                    <div className="buttons">
                        {currentUser.id !== user._id && (
                            <FollowButton
                                isFollowing={isFollowing}
                                targetUserId={user._id}
                                targetUserName={user.username}
                            />
                        )}
                    </div>
                </div>

                <div className="row-2">
                    <p>{user.bio}</p>
                </div>
            </div>
        </Link>
    );
};

export default UserPreview;
