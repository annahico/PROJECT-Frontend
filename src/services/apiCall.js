const BASE_URL = "http://localhost:4000/api";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
    }
    return response.json();
};

export const login = async (credentials) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    };

    try {
        const response = await fetch(`${BASE_URL}/auth/login`, options);
        const data = await handleResponse(response);
        return data.token;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

export const register = async (registerData) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    };

    try {
        const response = await fetch(`${BASE_URL}/auth/register`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};
