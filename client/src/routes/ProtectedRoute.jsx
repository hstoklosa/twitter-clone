import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loading } from "../components";

const ProtectedRoute = ({ children }) => {
    const { auth, authLoading } = useSelector((state) => ({
        auth: state.auth,
        authLoading: state.loading["auth/checkAuth"],
    }));

    if (!auth.hasOwnProperty("user") || authLoading) {
        return <Loading />;
    }

    if (!auth.user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
