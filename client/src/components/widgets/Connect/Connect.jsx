import "./styles.css";
import "../../common/BaseWidget/styles.css";

import { useCheckAuthQuery } from "../../../features/api/authApi";
import { useGetRecommendedUsersQuery } from "../../../features/api/userApi";
import { BaseWidget, ConnectItem } from "../../index";

const Connect = () => {
    const { data: { data: currentUser } } = useCheckAuthQuery();

    const {
        data: { data } = {},
        isLoading,
        isError,
    } = useGetRecommendedUsersQuery(
        { id: currentUser.id, page: 1, limit: 5 },
        { skip: !currentUser.id, }
    );

    return (
        <BaseWidget
            className="connect-list"
            title="Who to follow"
            redirectTo={`/explore/people`}
            isLoading={isLoading}
            isError={isError}
            isEmpty={data?.length === 0}
            renderData={() => data.map((user, idx) => (
                <ConnectItem
                    key={idx}
                    user={user}
                    isFollowed={user.followers.includes(currentUser.id)}
                />
            ))}
        />
    );
};

export default Connect;
