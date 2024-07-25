const BASE_URL = "http://localhost:4000/api";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
    }
    return response.json();
};

export const createAppointment = async (appointmentData, token) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
    };

    try {
        const response = await fetch(`${BASE_URL}/appointments`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error creating appointment:", error);
        return { success: false, message: error.message };
    }
};

export const getUserAppointments = async (userId, token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${BASE_URL}/appointments/user/${userId}`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error getting user appointments:", error);
        return { success: false, message: error.message };
    }
};

export const updateAppointmentById = async (data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${BASE_URL}/appointments/${data.id}`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error updating appointment:", error);
        return { success: false, message: error.message };
    }
};

export const deleteAppointmentById = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${BASE_URL}/appointments/${id}`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return { success: false, message: error.message };
    }
};

export const getAllAppointments = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${BASE_URL}/appointments`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error fetching all appointments:", error);
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
        return await handleResponse(response);
    } catch (error) {
        console.error("Error fetching services:", error);
        return { success: false, message: "Error fetching services", error };
    }
};
