import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useLoading } from "../context/LoadingProvider";

import { Loading } from "../components";

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();
    const { loadingState } = useLoading();

    if (loadingState.auth) {
        return <Loading />; // or some loading spinner :D
    }

    if (auth === null && !loadingState.auth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
