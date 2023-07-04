import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
