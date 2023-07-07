import { createContext, useContext, useState, useEffect } from "react";
import { useLoading } from "./LoadingProvider";
import { sendRequest } from "../utils";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const { loadingDispatch } = useLoading();

    // async useEffect
    useEffect(() => {
        loadingDispatch({
            type: "SET_LOADING",
            payload: {
                name: "auth",
                isLoading: true,
            },
        });

        (async () => {
            const response = await sendRequest("http://localhost:8080/auth/check-auth/");

            if (response.auth) {
                return setAuth(response.user);
            }

            setAuth(null);
        })();

        loadingDispatch({
            type: "SET_LOADING",
            payload: {
                name: "auth",
                isLoading: false,
            },
        });
    }, []);

    const signUp = async (user) => {
        const { displayName, username, email, password } = user;

        const response = await sendRequest("http://localhost:8080/auth/signup/", "POST", {
            displayName,
            username,
            email,
            password,
        });

        if (response.auth) {
            setAuth(response.user);
            return { success: true };
        }

        setAuth(null);
        return { success: false };
    };

    const signIn = async ({ identifier, password }) => {
        const response = await sendRequest("http://localhost:8080/auth/signin/", "POST", {
            identifier,
            password,
        });

        if (response.auth) {
            setAuth(response.user);
            return { success: true };
        }

        setAuth(null);
        return { success: false };
    };

    const signOut = async () => {
        return await sendRequest("http://localhost:8080/auth/logout", "GET");
    };

    const confirmEmail = async (email, setCode) => {
        const response = await sendRequest(`http://localhost:8080/auth/confirm-email/${email}`, "GET");

        if (response) {
            setCode(response.code);
        }
    };

    const checkIdentifier = async (identifier) => {
        const response = await sendRequest(`http://localhost:8080/auth/check-identifier/${identifier}`, "GET");
        return response.exists;
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                signUp,
                signIn,
                signOut,
                confirmEmail,
                checkIdentifier,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
