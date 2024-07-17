import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { Pagination } from "../../common/Pagination/Pagination";
import { useAuth } from "../../context/UseContext"; // Actualiza a `useAuth`
import { DeleteAppointment, DeleteUser, GetServices, GetUsers } from "../../services/apiCalls";
import "./Admin.css";

const numUserDisplay = 5;
const numServiceDisplay = 2;
const numAppointmentDisplay = 15;

export const Admin = () => {
    const { userData } = useAuth();  // Utiliza `useAuth` para obtener `userData`
    const [tokenStorage] = useState(userData?.token);
    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);

    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const [roleStorage] = useState(userData?.roleName);

    const [currentPageU, setCurrentPageU] = useState(1);
    const [currentPageS, setCurrentPageS] = useState(1);
    const [currentPageA, setCurrentPageA] = useState(1);

    const [usersPerPage] = useState(numUserDisplay);
    const [servicesPerPage] = useState(numServiceDisplay);
    const [appointmentsPerPage] = useState(numAppointmentDisplay);

    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/admin");
        }
    }, [roleStorage, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!tokenStorage) {
                    throw new Error("Token is not available");
                }
                const [usersData, servicesData, appointmentData] = await Promise.all([
                    GetUsers(tokenStorage),
                    GetServices(),
                    GetAllAppointments(tokenStorage),
                ]);
                setUsers(usersData);
                setServices(servicesData.data);
                setAppointments(appointmentData);
                setLoadedData(true);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [tokenStorage]);

    const deleteUser = async (id) => {
        try {
            await DeleteUser(tokenStorage, id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error.message);
        }
    };

    const deleteService = async (id) => {
        try {
            await DeleteService(tokenStorage, id);
            setServices(prevServices => prevServices.filter(service => service.id !== id));
        } catch (error) {
            console.error('Failed to delete service:', error.message);
        }
    };

    const deleteAppointment = async (id) => {
        try {
            await DeleteAppointment(tokenStorage, id);
            setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
        } catch (error) {
            console.error('Failed to delete appointment:', error.message);
        }
    };

    const pageCountUsers = Math.ceil(users.length / numUserDisplay);
    const pageCountServices = Math.ceil(services.length / numServiceDisplay);
    const pageCountAppointments = Math.ceil(appointments.length / numAppointmentDisplay);

    const handlePageClickUsers = ({ selected }) => {
        setCurrentPageU(selected + 1);
    };
    const handlePageClickServices = ({ selected }) => {
        setCurrentPageS(selected + 1);
    };
    const handlePageClickAppointments = ({ selected }) => {
        setCurrentPageA(selected + 1);
    };

    const indexOfLastUser = currentPageU * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const indexOfLastService = currentPageS * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    const indexOfLastAppointment = currentPageA * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    return (
        <>
            <Header />
            <div className="adminDesign">
                <div>
                    {/* USERS */}
                    <table className="table">
                        <div className="div">USERS: there are a total of {users.length} entries</div>
                        <thead className="thead">
                            <tr className="tr th">
                                <th className="pos">#</th>
                                <th className="name">Surname, Name</th>
                                <th className="birth">Date of birth</th>
                                <th className="email">e-mail address</th>
                                <th className="role">Role</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {currentUsers.map((user, index) => (
                                <tr className={`tr ${index % 2 === 0 ? "grayBg" : ""}`} key={user.id}>
                                    <td className="pos">{indexOfFirstUser + index + 1}</td>
                                    <td className="name">{user.lastName}, {user.firstName}</td>
                                    <td className="birth">{dayjs(user.birthDate).format("YYYY-MM-DD")}</td>
                                    <td className="email">{user.email}</td>
                                    <td className="role">{user.role.name}</td>
                                    <td className="buttons">
                                        <button className="del" onClick={() => deleteUser(user.id)}>delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        className="tbody"
                        currentPage={currentPageU - 1}
                        totalPages={pageCountUsers}
                        onPageChange={handlePageClickUsers}
                    />

                    {/* SERVICES */}
                    <table className="table">
                        <div className="div">SERVICES: there are a total of {services.length} entries</div>
                        <thead className="thead">
                            <tr className="tr th">
                                <th className="pos">#</th>
                                <th className="title">Title</th>
                                <th className="description">Description</th>
                                <th className="image">Image</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {currentServices.map((service, index) => (
                                <tr className={`tr ${index % 2 === 0 ? "grayBg" : ""}`} key={service.id}>
                                    <td className="pos">{indexOfFirstService + index + 1}</td>
                                    <td className="title">{service.serviceName}</td>
                                    <td className="description">{service.description}</td>
                                    <td className="image"><img src={`./src/img/s${service.id <= 4 ? service.id : service.id % 4}.png`} alt={service.id} /></td>
                                    <td className="buttons">
                                        <button className="del" onClick={() => deleteService(service.id)}>delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        className="tbody"
                        currentPage={currentPageS - 1}
                        totalPages={pageCountServices}
                        onPageChange={handlePageClickServices}
                    />

                    {/* APPOINTMENTS */}
                    <table className="table">
                        <div className="div">APPOINTMENTS: there are a total of {appointments.length} entries</div>
                        <thead className="thead">
                            <tr className="tr th">
                                <th className="pos">#</th>
                                <th className="pos">Id</th>
                                <th className="service">Service</th>
                                <th className="userid">User</th>
                                <th className="day">Date of appointment</th>
                                <th className="time">Hour</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {currentAppointments.map((appointment, index) => (
                                <tr className={`tr ${index % 2 === 0 ? "grayBg" : ""}`} key={appointment.id}>
                                    <td className="pos">{indexOfFirstAppointment + index + 1}</td>
                                    <td className="pos">ref.{appointment.id}</td>
                                    <td className="service">{services.find(service => service.id === appointment.serviceId)?.serviceName}</td>
                                    <td className="user">
                                        (id={appointment.userId}){" "}{users.find(user => user.id === appointment.userId)?.lastName},{" "}{users.find(user => user.id === appointment.userId)?.firstName}
                                    </td>
                                    <td className="day">{dayjs(appointment.appointmentDate).format("ddd YYYY-MM-DD")}</td>
                                    <td className="time">{dayjs(appointment.appointmentDate).format("HH:mm")}</td>
                                    <td className="buttons">
                                        <button className="del" onClick={() => deleteAppointment(appointment.id)}>delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        className="tbody"
                        currentPage={currentPageA - 1}
                        totalPages={pageCountAppointments}
                        onPageChange={handlePageClickAppointments}
                    />
                </div>
            </div>
        </>
    );
};
