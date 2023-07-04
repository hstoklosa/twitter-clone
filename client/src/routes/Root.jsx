import "../styles/Login.css";

import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/";
import { useAuth } from "../context/AuthProvider";

const Root = () => {
    const { auth } = useAuth();

    return (
        <div className="container">
            <Sidebar minimal={auth ? false : true} />
            <Outlet />
        </div>
    );
};

export default Root;
