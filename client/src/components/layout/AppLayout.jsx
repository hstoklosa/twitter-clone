import { Outlet } from "react-router-dom";
import { Sidebar } from "../index";

const AppLayout = ({ children }) => {

    return (
        <div className="app-container">
            <Sidebar />
            <Outlet />
        </div>
    );
};


export default AppLayout;
