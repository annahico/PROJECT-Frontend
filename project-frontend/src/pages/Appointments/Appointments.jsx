import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { ServiceCard } from '../../common/Card/Card';
import { Header } from "../../common/Header/Header";
import { DeleteAppointment, GetAppointment } from "../../services/apiCalls";
import "./Appointments.css";

export const Appointment = () => {
    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token);
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getUserAppointment = async () => {
            try {
                const fetched = await GetAppointment(tokenStorage);
                const formattedAppointments = fetched.data.map((appointment) => {
                    return {
                        ...appointment,
                        id: appointment.id,
                    };
                });

                setAppointments(formattedAppointments);
                setLoadedData(true);
            } catch (error) {
                return error;
            }
        };

        if (!loadedData) {
            getUserAppointment();
        }
    }, [tokenStorage, loadedData]);

    const deleteAppointment = async (appointmentId) => {
        try {
            if (appointmentId === null || appointmentId === undefined || appointmentId === "") {
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
            return "Error deleting the appointment:", error;
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
                        "null"
                    )}
                </div>
            </div>
        </>
    );
}
