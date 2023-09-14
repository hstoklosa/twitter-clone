import "../styles/Login.css";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Loading, Sidebar } from "../components/";

import { useCheckAuthQuery } from "../store/api/authApi";
import { useGetUserInfoQuery } from "../store/api/userApi";

const Root = () => {
    const { data: auth, isLoading: authLoading, isFetching: authFetching } = useCheckAuthQuery();

    const { isLoading: userLoading } = useGetUserInfoQuery(auth?.info?.username, {
        skip: !auth?.isAuthenticated,
    });

    if (authLoading || userLoading || authFetching) {
        return <Loading />;
    }

    return (
        <div className="container">
            <Sidebar
                minimal={!auth.isAuthenticated}
                currentUsername={auth?.info?.username}
            />
            <Outlet />
        </div>
    );
};

export default Root;
