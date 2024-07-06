const root = "http://localhost:4000/api/";

export const RegisterUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}auth/register`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error registering user");
        }

        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const LoginUser = async (credentials) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    };

    try {
        const response = await fetch(`${root}auth/login`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error logging in");
        }

        return data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const GetProfile = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${root}user/profile`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error fetching profile");
        }

        return data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};


export const UpdateProfile = async (token, data) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${root}user/profile`, options);
        const updatedData = await response.json();

        if (!response.ok) {
            throw new Error(updatedData.message || "Error updating profile");
        }

        return updatedData;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};


export const GetAppointments = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${root}appointments`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error fetching appointments");
        }

        return data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};


export const PostAppointment = async (token, appointmentsCredentials) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentsCredentials),
    };

    try {
        const response = await fetch(`${root}appointments`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error creating appointment");
        }

        return data;
    } catch (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
};


export const GetServices = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${root}services`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error fetching services");
        }

        return data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};