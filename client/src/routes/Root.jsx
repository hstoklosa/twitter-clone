import "../styles/Login.css";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Sidebar } from "../components/";
import { checkAuth } from "../redux/authSlice";

const Root = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        (async () => {
            const result = await dispatch(checkAuth());

            console.log("REFRESH_AUTH: ", result);

            if (result.error) {
                return;
            }
        })();
    }, []);

    return (
        <div className="container">
            <Sidebar minimal={user ? false : true} />
            <Outlet />
        </div>
    );
};

export default Root;
