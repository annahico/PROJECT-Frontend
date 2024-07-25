const BASE_URL = "http://127.0.0.1:4000/api/";

// Función para hacer peticiones a la API
export const apiRequest = async (endpoint, method, token = '', payload = null) => {
    const url = `${BASE_URL}${endpoint}`;

    // Configuración de los parámetros de la petición
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }), // Solo añadir el encabezado de autorización si hay un token
        },
        ...(payload && { body: JSON.stringify(payload) }), // Solo añadir el cuerpo si hay payload
    };

    try {
        const response = await fetch(url, options);
        
        // Verificar si la respuesta es correcta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        // Devolver la respuesta en formato JSON
        return await response.json();
    } catch (error) {
        console.error("Error in apiRequest:", error);
        throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
    }
};
