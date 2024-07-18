import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { ServiceCard } from '../../common/Card/Card';
import { Header } from "../../common/Header/Header";
import { useAuth } from '../../context/AuthContext';
import { DeleteAppointment, GetAppointment } from "../../services/apiCalls";
import "./Appointments.css";

export const Appointment = () => {
    const { userData } = useAuth(); 
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getUserAppointment = async () => {
            if (!userData || !userData.token) {
                return; 
            }

            try {
                const fetched = await GetAppointment(userData.token);
                if (fetched.data && Array.isArray(fetched.data)) {
                    const formattedAppointments = fetched.data.map((appointment) => {
                        return {
                            ...appointment,
                            id: appointment.id,
                        };
                    });
                    setAppointments(formattedAppointments);
                } else {
                    setAppointments([]);
                }
                setLoadedData(true);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setLoadedData(true); // Actualizamos el estado para evitar bucle infinito
            }
        };

        if (!loadedData) {
            getUserAppointment();
        }
    }, [userData, loadedData]);

    const deleteAppointment = async (appointmentId) => {
        try {
            if (!appointmentId) {
                throw new Error("The appointment ID is invalid");
            }
            if (!userData || !userData.token) {
                throw new Error("User data or token is invalid");
            }
            const result = await DeleteAppointment(userData.token, appointmentId);
            if (result.success) {
                setLoadedData(false);
                window.location.reload();
            } else {
                throw new Error(result.message || "Error deleting appointment");
            }
        } catch (error) {
            console.error("Error deleting the appointment:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="appointmentDesign">
                <div className="titleDesign">
                    My Appointments
                </div>
                <div className="cardsServiceRoster">
                    {loadedData && appointments.length > 0 ? (
                        appointments.map((appointment) => {
                            return (
                                <ServiceCard
                                    key={appointment.id}
                                    service={<span>Service: {appointment.service.name}</span>}
                                    appointmentDate={<span>Requested Date: {appointment.appointmentDate ? dayjs(appointment.appointmentDate).format('DD/MM/YYYY HH:mm') : 'Date not available'}</span>}
                                    onDelete={() => deleteAppointment(appointment.id)}
                                />
                            );
                        })
                    ) : (
                        <div>No appointments available</div>
                    )}
                </div>
            </div>
        </>
    );
};
