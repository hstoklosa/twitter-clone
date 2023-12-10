import { Navigate } from "react-router-dom";
import { useCheckAuthQuery } from "../features/api/authApi";
import { Loading } from "../components";

const PublicRoute = ({ children }) => {
    const {
        data: auth,
        isLoading: isAuthLoading,
        isFetching: isAuthFetching,
        isError: isAuthError,
    } = useCheckAuthQuery();

    if (isAuthLoading || isAuthFetching) {
        return <Loading />;
    }

    if (auth?.isAuthenticated && !isAuthError) {
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
