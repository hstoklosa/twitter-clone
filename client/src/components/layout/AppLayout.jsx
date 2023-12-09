import Sidebar from "./Sidebar";
import { Loading } from "../index";

const AppLayout = ({ isLoading, children }) => {
    console.log(isLoading);

    if (isLoading) {
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
