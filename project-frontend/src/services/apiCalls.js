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
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
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
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
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
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
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
        if (!updatedData.success) {
            throw new Error(updatedData.message);
        }
        return updatedData;
    } catch (error) {
        return error;
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
        return data;
    } catch (error) {
        return error;
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
        return data;
    } catch (error) {
        return error;
    }
};
