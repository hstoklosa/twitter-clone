import "../styles/Login.css";

import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/";

const Root = () => {
    return (
        <div className="container">
            <Sidebar minimal={false} />
            <Outlet />
        </div>
    );
};

export default Root;
