import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const storedUser = localStorage.getItem("userData")
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
            setIsLoggedIn(true)
        }
    }, []);

    const login = (userWithToken) => {
        setUserData(userWithToken);
        setIsLoggedIn(true)
        if (userWithToken.decoded.role === "ADMIN") { //falla
            setIsAdmin(true)
        }
        localStorage.setItem("userData", JSON.stringify(userWithToken));
    };

    const logout = () => {
        setUserData(null);
        setIsLoggedIn(false)
        setIsAdmin(false)
        localStorage.removeItem("userData");
    };

    return {
        userData,
        isLoggedIn,
        isAdmin,
        login,
        logout,
    };
};

export const useAuth = () => {
    return useContext(AuthContext);
};