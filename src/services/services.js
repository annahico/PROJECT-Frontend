const BASE_URL = "http://localhost:4000/api/";

export const createService = async (serviceData, token) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
    };

    try {
        const response = await fetch(`${BASE_URL}/services`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error creating service:", error);
        return { success: false, message: error.message };
    }
};

export const getAllServices = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${BASE_URL}/services`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching all services:", error);
        return { success: false, message: error.message };
    }
};

export const updateServiceById = async (data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${BASE_URL}/services/${data.id}`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error updating service by ID:", error);
        return { success: false, message: error.message };
    }
};

export const deleteServiceById = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${BASE_URL}/services/${id}`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error deleting service by ID:", error);
        return { success: false, message: error.message };
    }
};
