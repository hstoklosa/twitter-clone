import "../routes/Login/styles.css";

import { Outlet } from "react-router-dom";

import { useAppSelector } from "../app/store";
import { useCheckAuthQuery } from "../features/api/authApi";
import { useGetUserInfoQuery } from "../features/api/userApi";

import { Loading } from "../components";

const Root = () => {
    const auth = useAppSelector((state) => state.auth);

    const { isLoading: isAuthLoading } = useCheckAuthQuery();
    const { isLoading: isUserLoading } = useGetUserInfoQuery(auth.user?.username, {
        skip: !auth.isAuth,
    });

    if (isAuthLoading || isUserLoading)
        return <Loading />;


    return (
        <div className="app-container">
            <Outlet />
        </div>
    );
};

export default Root;
