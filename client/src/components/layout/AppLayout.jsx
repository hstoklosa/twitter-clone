import Sidebar from "./Sidebar";
import { Loading } from "../index";

const AppLayout = ({ isAuthLoading, children }) => {
    if (isAuthLoading) {
        return <Loading />;
    }

    return (
        <div className="app-container">
            <Sidebar />
            {children}
        </div>
    );
};

export default AppLayout;
