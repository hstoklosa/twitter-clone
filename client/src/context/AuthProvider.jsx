import { createContext, useContext, useState, useEffect } from "react";
import { sendRequest } from "../utils";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();

    useEffect(() => {
        (async () => {
            const response = await sendRequest("http://localhost:8080/auth/check-auth/");

            console.log("xd");

            if (response.auth) {
                return setAuth(response.user);
            }
        })();
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
