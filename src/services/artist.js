const BASE_URL = "http://localhost:4000/api";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
    }
    return response.json();
};

export const createArtist = async (artistData, token) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(artistData),
    };

    try {
        const response = await fetch(`${BASE_URL}/artists`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error creating artist:", error);
        return { success: false, message: error.message };
    }
};

export const getAllArtists = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${BASE_URL}/artists`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error fetching artists:", error);
        return { success: false, message: error.message };
    }
};

export const updateArtistById = async (data, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${BASE_URL}/artists/${data.id}`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error updating artist:", error);
        return { success: false, message: error.message };
    }
};

export const deleteArtistById = async (id, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${BASE_URL}/artists/${id}`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error("Error deleting artist:", error);
        return { success: false, message: error.message };
    }
};
