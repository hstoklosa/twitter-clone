import "../../styles/UserPreview.css";
import "../../styles/Profile.css";

import { Link } from "react-router-dom";
import { useCheckAuthQuery } from "../../store/api/authApi";
import { FollowButton } from "../index";

const UserPreview = ({ tweet: user = null }) => {
    const {
        data: { data: currentUser },
    } = useCheckAuthQuery();

    const isFollowing = user.followers.includes(currentUser.id);

    return (
        <Link className="user-card">
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
                        <p>@{user.username}</p>
                    </div>

                    <div className="buttons">
                        {currentUser.id !== user._id && (
                            <FollowButton
                                isFollowing={isFollowing}
                                targetUserId={user._id}
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
