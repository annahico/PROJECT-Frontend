import appointmentsApi from "./appointment";
import authService from "./auth";
import serviceApi from "./services";
import userApi from "./user";

export const authenticationService = {
    auth: authService,
};

export const apiUsers = {
    user: userApi,
};

export const apiServices = {
    service: serviceApi,
};

export const apiAppointments = {
    cappointment: appointmentsApi,
};
