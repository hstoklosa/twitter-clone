import { Navigate } from "react-router-dom";
import { useCheckAuthQuery } from "../store/api/authApi";

const ProtectedRoute = ({ children }) => {
    const { data: auth, isFetching: authFetching } = useCheckAuthQuery();

    if (!auth.isAuthenticated || authFetching) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return children;
};

export default ProtectedRoute;
