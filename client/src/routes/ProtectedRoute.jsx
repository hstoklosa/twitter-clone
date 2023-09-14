import { Navigate } from "react-router-dom";
import { useCheckAuthQuery } from "../store/api/authApi";

const ProtectedRoute = ({ children }) => {
    const { data: auth, isFetching: authFetching, isLoading: authLoading } = useCheckAuthQuery();

    if (!auth.isAuthenticated && !authFetching && !authLoading) {
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
