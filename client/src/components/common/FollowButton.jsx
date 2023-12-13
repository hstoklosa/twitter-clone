import { useAppSelector } from "../../app/store";
import {
    useFollowUserMutation,
    useUnfollowUserMutation,
} from "../../features/api/userApi";
import { LinkButton } from "./index";

const FollowButton = ({ targetUserId, isFollowing }) => {
    const { user: currentUser } = useAppSelector((state) => state.auth);

    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnfollowUserMutation();

    const handleFollow = async () => {
        const followData = {
            id: currentUser.id,
            targetUserId: targetUserId,
        };

        return isFollowing
            ? await unfollowUser(followData)
            : await followUser(followData);
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
