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

    return children;
};

export default PublicRoute;
