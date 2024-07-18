import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { ServiceCard } from '../../common/Card/Card';
import { Header } from "../../common/Header/Header";
import { useAuth } from '../../context/AuthContext'; // Importar useAuth para usar el contexto
import { DeleteAppointment, GetAppointment } from "../../services/apiCalls";
import "./Appointments.css";

export const Appointment = () => {
    const { userData } = useAuth(); // Usar useAuth para obtener los datos del usuario
    const [tokenStorage, setTokenStorage] = useState(userData?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getUserAppointment = async () => {
            try {
                const fetched = await GetAppointment(tokenStorage);
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
                setLoadedData(true); // Update state to true to avoid infinite loop
            }
        };

        if (!loadedData) {
            getUserAppointment();
        }
    }, [tokenStorage, loadedData]);

    const deleteAppointment = async (appointmentId) => {
        try {
            if (!appointmentId) {
                throw new Error("The appointment ID is invalid");
            }
            const result = await DeleteAppointment(tokenStorage, appointmentId);
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
