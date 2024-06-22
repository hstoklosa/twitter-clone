import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Sidebar, MobileNavbar, MobileSidebar } from "../index";
import PrivateRoute from "../../routes/PrivateRoute";

const AppLayout = () => {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

    return (
        <PrivateRoute>
            {!isSmallDevice
                ? <Sidebar />
                : (<>
                    <MobileSidebar />
                    <MobileNavbar />
                </>)
            }

            <Outlet />
        </PrivateRoute>
    );
};


export default AppLayout;
