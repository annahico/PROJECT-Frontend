import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { format } from 'date-fns';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Header } from "../../common/Layout/Header/Header";
import { useAuth } from '../../context/AuthContext';
import { DeleteAppointment, GetAppointment } from "../../services/appointment";
import "./Appointments.css";

export const Appointment = () => {
    const { authState } = useAuth(); 
    const navigate = useNavigate();
    const token = authState?.token;
    const [loadedData, setLoadedData] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const loadAppointmentsExecuted = useRef(false);

    useEffect(() => {
        if (!authState) {
            navigate("/login");
            return;
        }

        const getUserAppointment = async () => {
            if (!token) return;

            try {
                const fetched = await GetAppointment(token);
                if (fetched.data && Array.isArray(fetched.data)) {
                    const formattedAppointments = fetched.data.map((appointment) => ({
                        ...appointment,
                        id: appointment.id,
                    }));
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

        if (!loadAppointmentsExecuted.current) {
            getUserAppointment();
            loadAppointmentsExecuted.current = true;
        }
    }, [authState, token, navigate]);

    const deleteAppointment = async (appointmentId) => {
        try {
            const confirmDelete = await Swal.fire({
                title: "Are you sure you want to delete this appointment?",
                showCancelButton: true,
                confirmButtonText: "Accept",
            });

            if (confirmDelete.isConfirmed) {
                if (!appointmentId) throw new Error("The appointment ID is invalid");
                if (!token) throw new Error("User data or token is invalid");

                const result = await DeleteAppointment(token, appointmentId);
                if (result.success) {
                    setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
                } else {
                    throw new Error(result.message || "Error deleting appointment");
                }
            }
        } catch (error) {
            console.error("Error deleting the appointment:", error);
        }
    };

    return (
        <>
            <Header />
            <Box display="flex" justifyContent="center" alignItems="center" pt={15}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pb: 0,
                        width: '80%'
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                        My Appointments
                    </Typography>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={appointments}
                            columns={[
                                {
                                    field: 'appointmentDate',
                                    headerName: 'Date',
                                    width: 200,
                                    valueFormatter: ({ value }) => format(new Date(value), 'dd-MM-yyyy HH:mm'),
                                },
                                {
                                    field: 'serviceName',
                                    headerName: 'Service',
                                    width: 300,
                                    valueGetter: (params) => `${params.row.service.name}`,
                                },
                                {
                                    field: 'description',
                                    headerName: 'Description',
                                    width: 300,
                                    valueGetter: (params) => `${params.row.service.description}`,
                                },
                                {
                                    field: 'delete',
                                    headerName: '',
                                    sortable: false,
                                    width: 150,
                                    renderCell: (params) => (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => deleteAppointment(params.row.id)}
                                        >
                                            Delete
                                        </Button>
                                    ),
                                },
                            ]}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};
