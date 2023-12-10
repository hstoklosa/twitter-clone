import { Navigate } from "react-router-dom";
import { useCheckAuthQuery } from "../features/api/authApi";
import { Loading } from "../components";

const PrivateRoute = ({ children }) => {
    const {
        data: auth,
        isLoading: isAuthLoading,
        isFetching: isAuthFetching,
        isError: isAuthError,
    } = useCheckAuthQuery();

    if (isAuthLoading || isAuthFetching) {
        return <Loading />;
    }

    if (!auth?.isAuthenticated || isAuthError) {
        console.log(auth, isAuthLoading, isAuthFetching, isAuthError);
        console.log("Redirecting to /");
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
