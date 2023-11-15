import { LinkButton } from "../index";

import { useCheckAuthQuery } from "../../store/api/authApi";
import {
    useGetUserInfoQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
} from "../../store/api/userApi";

const FollowButton = ({ isFollowing, targetUserId }) => {
    const {
        data: { data: currentUser },
    } = useCheckAuthQuery();

    const [followUser, followResult] = useFollowUserMutation();
    const [unfollowUser, unfollowResult] = useUnfollowUserMutation();

    const handleFollow = async () => {
        const followData = {
            id: currentUser.id,
            targetUserId: targetUserId,
        };

        isFollowing ? await unfollowUser(followData) : await followUser(followData);
    };

    return (
        <LinkButton
            type="button"
            className={`follow ${isFollowing ? "btn-empty applied" : "white-btn"}`}
            onClick={handleFollow}
        >
            <span>{isFollowing ? "Following" : "Follow"}</span>
        </LinkButton>
    );
};

export default FollowButton;
