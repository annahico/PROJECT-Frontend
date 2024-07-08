// import React from 'react';
import { useNavigate } from "react-router-dom";
import { CustomLink } from "../../components/CustomLink/CustomLink";
import "./Header.css";

// Componente Header
export const Header = () => {
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));

    // Función para cerrar sesión
    const logOut = () => {
        localStorage.removeItem("passport");
        navigate("/login");
    };

    return (
        <div className="headerDesign">
            HEADER
            <CustomLink title="home" destination="/" />

            {passport?.token ? (
                <div className="menu">
                    <CustomLink
                        title={passport?.decodificado?.first_name}
                        destination="/profile"
                    />
                    <div onClick={logOut}>
                        <CustomLink title="log out" destination="/" />
                    </div>
                </div>
            ) : (
                <div className="menu">
                    <CustomLink title="register" destination="/register" />
                    <CustomLink title="login" destination="/login" />
                </div>
            )}
        </div>
    );
};
