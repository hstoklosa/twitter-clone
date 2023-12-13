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

    return children;
};

export default PrivateRoute;
