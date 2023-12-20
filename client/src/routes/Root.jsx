import "../routes/Login/styles.css";

import { Outlet } from "react-router-dom";

import { useAppSelector } from "../app/store";
import { useCheckAuthQuery } from "../features/api/authApi";
import { useGetUserInfoQuery } from "../features/api/userApi";

import { useTheme } from "../contexts/ThemeProvider";

import { Loading } from "../components";

const Root = () => {
    const auth = useAppSelector((state) => state.auth);

    const { theme, accent } = useTheme();

    const { isLoading: isAuthLoading } = useCheckAuthQuery();
    const { isLoading: isUserLoading } = useGetUserInfoQuery(auth.user?.username, {
        skip: !auth.isAuth,
    });


    return (
        <div id="app" data-theme={theme} data-accent={accent}>
            <div id="app-container">
                {(isAuthLoading || isUserLoading) ? <Loading /> : <Outlet />}

            </div>
        </div>
    );
};

export default Root;
