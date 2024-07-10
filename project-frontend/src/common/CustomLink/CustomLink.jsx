// import React from 'react';
import { useNavigate } from "react-router-dom";
import "./CustomLink.css";

// Componente CustomLink
export const CustomLink = ({ title, destination }) => {
    const navigate = useNavigate(); // Hook para la navegación

    // Retorna un div con un estilo personalizado y funcionalidad de navegación
    return (
        <div 
            className="navigateDesign" 
            onClick={() => navigate(destination)}
        >
            {title}
        </div>
    );
}

// Validación de propiedades
// CustomLink.propTypes = {
//     title: PropTypes.string.isRequired,
//     destination: PropTypes.string.isRequired
// };
