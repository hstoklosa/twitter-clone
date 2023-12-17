import "../routes/Login/styles.css";

import { Outlet } from "react-router-dom";

import { AppLayout } from "../components";
import { useAppSelector } from "../app/store";
import { useCheckAuthQuery } from "../features/api/authApi";
import { useGetUserInfoQuery } from "../features/api/userApi";

const Root = () => {
    const auth = useAppSelector((state) => state.auth);

    const { isLoading: isAuthLoading } = useCheckAuthQuery();
    const { isLoading: isUserLoading } = useGetUserInfoQuery(auth.user?.username, {
        skip: !auth.isAuth,
    });

    return (
        <AppLayout isAuthLoading={isAuthLoading || isUserLoading}>
            <Outlet />
        </AppLayout>
    );
};

export default Root;
