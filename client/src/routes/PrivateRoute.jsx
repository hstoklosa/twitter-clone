import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/store";

const PrivateRoute = ({ children }) => {
    const { isAuth } = useAppSelector((state) => state.auth);

    if (!isAuth) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return (
        <div
            id="app-container_wrapper"
            className="private-route"
        >
            {children}
        </div>
    );
};

export default PrivateRoute;
