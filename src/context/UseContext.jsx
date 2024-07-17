import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("userData");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUserData(parsedUser);
                setIsLoggedIn(true);
                if (parsedUser.decoded.role === "ADMIN") {
                    setIsAdmin(true);
                }
            }
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
        }
    }, []);

    const login = (userWithToken) => {
        setUserData(userWithToken);
        setIsLoggedIn(true);
        if (userWithToken.decoded.role === "ADMIN") {
            setIsAdmin(true);
        }
        localStorage.setItem("userData", JSON.stringify(userWithToken));
    };

    const logout = () => {
        setUserData(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
        localStorage.removeItem("userData");
    };

    return (
        <AuthContext.Provider value={{ userData, isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
