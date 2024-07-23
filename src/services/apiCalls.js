import axios from 'axios';

// Log in customer
export const logUser = async (body) => {
    try {
        const response = await axios.post('http://localhost:4000/customer/login', body);
        return response;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

// Log in worker
export const logWorker = async (body) => {
    try {
        const response = await axios.post('http://localhost:4000/tattoo_artist/login', body);
        return response;
    } catch (error) {
        console.error('Error logging in worker:', error);
        throw error;
    }
}

// Register user
export const registerUser = async (body) => {
    try {
        const response = await axios.post('http://localhost:4000/customer/register', body);
        return response;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

// Get all tattoos from gallery
export const bringTattoo = async () => {
    try {
        const response = await axios.get('http://localhost:4000/gallery/all');
        return response;
    } catch (error) {
        console.error('Error fetching tattoos:', error);
        throw error;
    }
}

// Get customer profile
export const bringProfile = async () => {
    try {
        const response = await axios.get('http://localhost:4000/customer/profile');
        return response;
    } catch (error) {
        console.error('Error fetching customer profile:', error);
        throw error;
    }
}

// Get artist profile
export const bringArtistProfile = async () => {
    try {
        const response = await axios.get('http://localhost:4000/tattoo_artist/profile');
        return response;
    } catch (error) {
        console.error('Error fetching artist profile:', error);
        throw error;
    }
}

// Get appointments for the customer
export const myDates = async (credentials) => {
    try {
        const response = await axios.get('http://localhost:4000/customer/appointment/', {
            headers: { Authorization: `Bearer ${credentials}` }
        });
        return response;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
}

// Delete an appointment
export const deleteMyDates = async (credentials) => {
    try {
        const response = await axios.delete('http://localhost:4000/appointments/delete', {
            headers: { Authorization: `Bearer ${credentials}` }
        });
        return response;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
}

// Get all customers
export const getAllCustomers = async (credentials) => {
    try {
        const response = await axios.get('http://localhost:4000/tattoo_artist/customers', {
            headers: { Authorization: `Bearer ${credentials}` }
        });
        return response;
    } catch (error) {
        console.error('Error fetching all customers:', error);
        throw error;
    }
}

// Get all appointments for the tattoo artist
export const getAllAppointments = async (credentials) => {
    try {
        const response = await axios.get('http://localhost:4000/tattoo_artist/appointment', {
            headers: { Authorization: `Bearer ${credentials}` }
        });
        return response;
    } catch (error) {
        console.error('Error fetching all appointments:', error);
        throw error;
    }
}

// Create a new appointment
export const appointments = async (token, appointmentData) => {
    try {
        const response = await axios.post('http://localhost:4000/appointments/create', appointmentData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
}
