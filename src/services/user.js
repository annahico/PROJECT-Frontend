import { apiRequest } from "../utils/Helper";

const BASE_URL = "users";

const handleApiRequest = (endpoint, method, token = null, payload = null) => {
    return apiRequest(endpoint, method, token, payload);
};

const userApi = {
    getArtists: () => handleApiRequest(`${BASE_URL}/tattoo_artist`, 'GET'),

    getProfile: (token) => handleApiRequest(`${BASE_URL}/profile`, 'GET', token),

    updateProfile: (token, payload) => handleApiRequest(`${BASE_URL}/profile`, 'PUT', token, payload),

    userAll: (token) => handleApiRequest(BASE_URL, 'GET', token),

    deleteUser: (token, id) => handleApiRequest(`${BASE_URL}/${id}`, 'DELETE', token),
};

export default userApi;
