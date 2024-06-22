import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/store";

const PublicRoute = ({ children }) => {
    const { isAuth } = useAppSelector((state) => state.auth);

    if (isAuth) {
        return (
            <Navigate
                to="/home"
                replace
            />
        );
    }

    return (
        <div
            id="app-container_wrapper"
            className="public-route"
        >
            {children}
        </div>
    );
};

export default PublicRoute;
