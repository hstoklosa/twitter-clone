import "../routes/Login/styles.css";

import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { useAppSelector } from "../app/store";
import { useCheckAuthQuery } from "../features/api/authApi";
import { useGetUserInfoQuery } from "../features/api/userApi";

import { useTheme } from "../contexts/ThemeProvider";

import { Loading } from "../components";

const toastOptions = {
    style: {
        color: 'white',
        borderRadius: '4px',
        backgroundColor: 'var(--primary-colour)',
        zIndex: 999999999
    },
    success: { duration: 4000 }
};

const Root = () => {
    const auth = useAppSelector((state) => state.auth);

    const { theme, accent } = useTheme();

    const { isLoading: isAuthLoading } = useCheckAuthQuery();
    const { isLoading: isUserLoading } = useGetUserInfoQuery(auth.user?.username, {
        skip: !auth.isAuth,
    });


    return (
        <div id="app" data-theme={theme} data-accent={accent}>
            <Toaster
                containerStyle={{ zIndex: 99999999999 }}
                position="bottom-center"
                toastOptions={toastOptions}
                reverseOrder={false}
            />

            <div id="app-container">
                {(isAuthLoading || isUserLoading) ? <Loading /> : <Outlet />}
            </div>
        </div>
    );
};

export default Root;
