import { LinkButton } from "./index";

import { useCheckAuthQuery } from "../../features/api/authApi";
import {
    useGetUserInfoQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
} from "../../features/api/userApi";

const FollowButton = ({ targetUserId, isFollowing }) => {
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
