import { apiRequest } from "../utils/Helper";

const BASE_URL = "appointments";

const handleApiRequest = (method, token, payload = null, id = '') => {
    const endpoint = id ? `${BASE_URL}/${id}` : BASE_URL;
    return apiRequest(endpoint, method, token, payload);
};

const appointmentsApi = {
    myAppointments: (token) => handleApiRequest('GET', token),

    addAppointment: (token, payload) => handleApiRequest('POST', token, payload),

    updateAppointment: (token, payload) => handleApiRequest('PUT', token, payload),

    getAppointment: (token, id) => handleApiRequest('GET', token, null, id),
};

export default appointmentsApi;
