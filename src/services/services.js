import { apiRequest } from "../utils/Helper";

const BASE_URL = "services";

const fetchFromApi = (method) => {
    const endpoint = BASE_URL;
    return apiRequest(endpoint, method);
};

const serviceApi = {
    getServices: () => fetchFromApi('GET'),
};

export default serviceApi;
