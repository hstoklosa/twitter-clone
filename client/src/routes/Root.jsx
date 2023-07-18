import "../styles/Login.css";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Loading, Sidebar } from "../components/";
import { checkAuth } from "../slices/authSlice";

const Root = () => {
    const { user, authLoading } = useSelector((state) => ({
        user: state.auth.user,
        authLoading: state.loading["auth/checkAuth"],
    }));
    const dispatch = useDispatch();

    // checkAuth to check for existing session
    useEffect(() => {
        (async () => {
            await dispatch(checkAuth());
        })();
    }, []);

    if (authLoading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <Sidebar minimal={user ? false : true} />
            <Outlet />
        </div>
    );
};

export default Root;
