import { Navigate, Route, Routes } from "react-router-dom";
import { Admin } from "../Admin/Admin";
import { Appointment } from "../Appointments/Appointments";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import NewAppointment from "../NewAppointments/NewAppointments";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Services } from "../Services/Services";
import { Users } from "../Users/Users";

export const Body = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/newappointments" element={<NewAppointment />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<Users />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
};