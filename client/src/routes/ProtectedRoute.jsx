import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loading } from "../components";

const ProtectedRoute = ({ children }) => {
    const { user, authLoading } = useSelector((state) => ({
        user: state.auth.user,
        authLoading: state.loading["auth/checkAuth"],
    }));

    if (authLoading) {
        return <Loading />; // or some loading spinner :D
    }

    if (user === null && !authLoading) {
        console.log("SENDING_TO_LOGIN");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
