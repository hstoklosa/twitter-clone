import { Outlet } from "react-router-dom";
import { Sidebar } from "../index";

import PrivateRoute from "../../routes/PrivateRoute";

const AppLayout = ({ children }) => {

    return (
        <PrivateRoute>
            <Sidebar />
            <Outlet />
        </PrivateRoute>
    );
};


export default AppLayout;
