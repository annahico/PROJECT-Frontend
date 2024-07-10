const root = "http://localhost:4000/api/";

const fetchOptions = (method, body = null, token = null) => {
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };
};

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data;
};

export const RegisterUser = async (user) => {
    try {
        const response = await fetch(`${root}auth/register`, fetchOptions("POST", user));
        return await handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const LoginUser = async (credentials) => {
    try {
        const response = await fetch(`${root}auth/login`, fetchOptions("POST", credentials));
        return await handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const GetProfile = async (token) => {
    try {
        const response = await fetch(`${root}user/profile`, fetchOptions("GET", null, token));
        return await handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const UpdateProfile = async (token, data) => {
    try {
        const response = await fetch(`${root}user/profile`, fetchOptions("PUT", data, token));
        return await handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const GetAppointments = async (token) => {
    try {
        const response = await fetch(`${root}appointments`, fetchOptions("GET", null, token));
        return await handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const PostAppointment = async (token, appointmentsCredentials) => {
    try {
        const response = await fetch(`${root}appointments`, fetchOptions("POST", appointmentsCredentials, token));
        return await handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const GetServices = async () => {
    try {
        const response = await fetch(`${root}services`, fetchOptions("GET"));
        return await handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const DeleteUserAppointment = async (appointmentId, token) => {
    try {
        const response = await fetch(`${root}appointments/${appointmentId}`, fetchOptions("DELETE", null, token));
        return await handleResponse(response);
    } catch (error) {
        return error;
    }
};

export const GetUsers = async (token) => {
    try {
        const response = await fetch(`${root}users`, fetchOptions("GET", null, token));
        return await handleResponse(response);
    } catch (error) {
        return error;
    }
}

export const DeleteUsers = async (userId, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(`${root}users/${userId}`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}
export const SeeUsersProfile = async (userId, token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(`${root}users/${userId}`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}
export const GetAppointmentsUsersProfile = async (userId, token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(`${root}${userId}/appointments`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }

}
export const DeleteServiceById = async (serviceId, token) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(`${root}services/${serviceId}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data

    } catch (error) {
        return error;
    }


}
export const PostService = async (appointmentsCredentials, token) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(appointmentsCredentials)
    };
    try {
        const response = await fetch(`${root}services`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data

    } catch (error) {
        return error;
    }

}
export const UpdateServiceById = async (servicesCredentials, ServiceId, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(servicesCredentials)
    };
    try {
        const response = await fetch(`${root}services/${ServiceId}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data

    } catch (error) {
        return error;
    }

}
export const UpdateUserById = async (userCredentials, UserId, token) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userCredentials)
    };
    try {
        const response = await fetch(`${root}users/${UserId}`, options);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data

    } catch (error) {
        return error;
    }
};
