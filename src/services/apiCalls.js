const root = "http://localhost:4000/api/";

export const RegisterUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
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

export const LoginUser = async (credenciales) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales)
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
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(`${root}users/profile`, options);
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
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}users/profile`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const GetServices = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(`${root}services`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        const servicesData = data.data;
        return servicesData;
    } catch (error) {
        return error;
    }
};

export const GetAppointment = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        const response = await fetch(`${root}appointments`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const DeleteAppointment = async (token, data) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ "id": data })
    };
    try {
        const response = await fetch(`${root}appointments`, options);
        const responseData = await response.json();
        if (!responseData.success) {
            throw new Error(responseData.message);
        }
        return responseData;
    } catch (error) {
        return error;
    }
};

export const GetUsers = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        const response = await fetch(`${root}users`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        const servicesData = data.data;
        return servicesData;
    } catch (error) {
        throw new Error(error);
    }
};

export const DeleteUser = async (token, data) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`${root}users/${data.id}`, options);
        const responseData = await response.json();
        if (!responseData.success) {
            throw new Error(responseData.message);
        }
        return responseData;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const CreateAppointment = async (token, data) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(`${root}appointments`, options);
        const responseData = await response.json();
        if (!responseData.success) {
            throw new Error(responseData.message);
        }
        return responseData;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

// Nueva función para obtener todas las citas
export const GetAllAppointments = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        const response = await fetch(`${root}appointments/all`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};
