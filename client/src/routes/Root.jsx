import "../routes/Login/styles.css";

import { Outlet } from "react-router-dom";
import { AppLayout } from "../components";
import { useCheckAuthQuery } from "../features/api/authApi";
import { useGetUserInfoQuery } from "../features/api/userApi";

const Root = () => {
    const { auth, isAuthLoading } = useCheckAuthQuery(null, {
        selectFromResult: ({ data, isLoading, isFetching, isUninitialized }) => ({
            auth: data,
            isAuthLoading: !isUninitialized && (isLoading || isFetching),
        }),
    });

    const { isUserLoading } = useGetUserInfoQuery(auth?.data?.username, {
        skip: !auth?.data?.username,
        selectFromResult: ({ isLoading, isFetching, isUninitialized }) => ({
            isUserLoading: !isUninitialized && (isLoading || isFetching),
        }),
    });

    return (
        <AppLayout isLoading={isAuthLoading || isUserLoading}>
            <Outlet />
        </AppLayout>
    );
};

export default Root;
