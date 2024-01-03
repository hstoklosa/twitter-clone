import "./Auth/styles.css";

import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from "@uidotdev/usehooks";

import { useTheme } from "../contexts/ThemeProvider";
import { useAppSelector } from "../app/store";
import { useCheckAuthQuery } from "../features/api/authApi";
import { useGetUserInfoQuery } from "../features/api/userApi";
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
    const currDevice =
        useMediaQuery("only screen and (max-width : 420px)") ? "mobile" : "desktop";

    const { isLoading: isAuthLoading } = useCheckAuthQuery();
    const { isLoading: isUserLoading } = useGetUserInfoQuery(auth.user?.username, {
        skip: !auth.isAuth,
    });


    return (
        <div id="app"
            data-theme={theme}
            data-accent={accent}
            className={currDevice}
        >
            <Toaster
                toastOptions={toastOptions}
                containerStyle={{ zIndex: 99999999999 }}
                position="bottom-center"
                reverseOrder={false}
            />

            <ScrollRestoration
                getKey={(location, matches) => {
                    return location.key;
                }}
            />

            <div id="app-container">
                <div id="app-container_wrapper">
                    {(isAuthLoading || isUserLoading)
                        ? <Loading />
                        : <Outlet />
                    }
                </div>
            </div>
        </div>
    );
};

export default Root;
