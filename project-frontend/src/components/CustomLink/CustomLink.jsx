// import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import "./CustomLink.css";

// Componente CustomLink
export const CustomLink = ({ title, destination }) => {
    const navigate = useNavigate(); // Hook para la navegación

    // Retorna un div con un estilo personalizado y funcionalidad de navegación
    return (
        <div 
            className="customLinkDesign" 
            onClick={() => navigate(destination)}
        >
            {title}
        </div>
    );
}

// Validación de propiedades
CustomLink.propTypes = {
    title: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired
};
