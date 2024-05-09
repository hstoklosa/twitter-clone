import { useAppSelector, useAppDispatch } from "../../app/store";
import { modalActions } from "../../features/slices/modalSlice";
import {
    useFollowUserMutation,
    useUnfollowUserMutation,
} from "../../features/api/userApi";

import { LinkButton } from "../index";


const _desc = "Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected.";

const FollowButton = ({ targetUserName, targetUserId, isFollowing }) => {
    const { user: currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnfollowUserMutation();

    const handleUnfollowAction = async (e) => {
        await unfollowUser({ id: currentUser.id, targetUserId: targetUserId });
    }

    const handleFollow = async (e) => {
        !isFollowing
            ? await followUser({ id: currentUser.id, targetUserId: targetUserId })
            : dispatch(modalActions.openModal({
                name: "ActionModal",
                props: {
                    title: `Unfollow the @${targetUserName}?`,
                    description: _desc,
                    mainBtnLabel: "Unfollow",
                    focusOnMainBtn: true,
                    action: handleUnfollowAction,
                }
            }))
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
