import "../styles/Login.css";

import { Outlet } from "react-router-dom";

import { Loading, Sidebar } from "../components/";

import { useCheckAuthQuery } from "../store/api/authApi";
import { useGetUserInfoQuery } from "../store/api/userApi";

const Root = () => {
    const { data: auth, isLoading: authLoading, isFetching: authFetching } = useCheckAuthQuery();

    const {
        data: user,
        isLoading: userLoading,
        isFetching: userFetching,
        isSuccess: userSuccess,
    } = useGetUserInfoQuery(auth?.data?.username, { skip: !auth?.data?.username });

    if (authLoading || userLoading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <Sidebar userLoggedIn={auth?.data?.username} />
            <Outlet />
        </div>
    );
};

export default Root;
