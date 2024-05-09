import "./Auth/styles.css";

import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from "@uidotdev/usehooks";

import { useTheme } from "../contexts/ThemeProvider";
import { useAppSelector } from "../app/store";
import { useCheckAuthQuery } from "../features/api/authApi";
import { useGetUserInfoQuery } from "../features/api/userApi";
import { Loading, Tooltip, ModalRoot } from "../components";


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
    const { user, isAuth } = useAppSelector((state) => state.auth);

    const { isLoading: isAuthLoading } = useCheckAuthQuery();
    const { isLoading: isUserLoading } = useGetUserInfoQuery(user?.username, {
        skip: !isAuth,
    });

    const { theme, accent } = useTheme();
    const currDevice = useMediaQuery("only screen and (max-width : 420px)") ? "mobile" : "desktop";

    return (
        <div id="app"
            data-theme={theme}
            data-accent={accent}
            className={currDevice}
        >
            <Toaster
                toastOptions={toastOptions}
                position="bottom-center"
                containerStyle={{ zIndex: 99999999999 }}
                reverseOrder={false}
            />

            {/* <ScrollRestoration getKey={(location, matches) => location.pathname} /> */}

            <ScrollRestoration getKey={(location, matches) => {
                let scrollByPathname = matches.some(
                    (m) => (m.handle)?.scrollMode === 'pathname'
                );

                if (scrollByPathname && !location.state?.preventRestore) {
                    return location.pathname;
                }

                return location.key;
            }} />

            <Tooltip />

            <div id="app-container">
                <ModalRoot />

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
