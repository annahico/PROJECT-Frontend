const BASE_URL = "http://127.0.0.1:4000/api/auth/";

const fetchWithResponse = async (url, payload) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const status = response.status;
        const responseData = await response.json();
        return { status, responseData };
    } catch (error) {
        return { error };
    }
};

const authService = {
    register: (payload) => fetchWithResponse(`${BASE_URL}register`, payload),

    login: (payload) => fetchWithResponse(`${BASE_URL}login`, payload),
};

export default authService;
