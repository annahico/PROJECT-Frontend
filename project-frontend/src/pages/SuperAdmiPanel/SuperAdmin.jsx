import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../common/Header/Header";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomLink } from "../../components/CustomLink/CustomLink";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { DeleteUsers, GetAppointmentsUsersProfile, GetUsers, SeeUsersProfile, UpdateUserById } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import "./SuperAdmin.css";

export const SuperAdminPanel = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userProfile, setUserProfile] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
    });
    const [userError, setUserProfileError] = useState({
        first_nameError: "",
        last_nameError: "",
        emailError: "",
    });
    const [userAppointmentProfile, setUserAppointmentProfile] = useState([]);
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage] = useState(datosUser?.token);
    const [msgError, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");

    const inputHandler = (e) => {
        setUserProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value);
        setUserProfileError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    const BringData = async () => {
        try {
            const fetched = await GetUsers(tokenStorage);
            setUsers(fetched.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (users.length === 0) {
            BringData();
        }
    }, [users.length, tokenStorage]);

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage, navigate]);

    useEffect(() => {
        if (datosUser?.decodificado.roleName !== "super_admin") {
            navigate("/");
        }
    }, [datosUser, navigate]);

    const DeleteUser = async (userId) => {
        try {
            const fetched = await DeleteUsers(userId, tokenStorage);
            if (!fetched.success) {
                setMsgError(fetched.message);
            } else {
                setMsgSuccess(fetched.message);
                BringData();
            }
        } catch (error) {
            setMsgError(error.message);
        }
    };

    const UpdateUserProfile = async (userId) => {
        try {
            const fetched = await UpdateUserById(userProfile, userId, tokenStorage);
            if (!fetched.success) {
                setMsgError(fetched.message);
            } else {
                setMsgSuccess(fetched.message);
                BringData();
            }
        } catch (error) {
            setMsgError(error.message);
        }
    };

    const GetUsersAppointments = async (userId) => {
        try {
            const fetched = await GetAppointmentsUsersProfile(userId, tokenStorage);
            if (!fetched.success) {
                setMsgError(fetched.message);
            } else {
                setUserAppointmentProfile(fetched.data);
                setMsgSuccess(fetched.message);
            }
        } catch (error) {
            setMsgError(error.message);
        }
    };

    const SeeUserProfile = async (userId) => {
        try {
            const fetched = await SeeUsersProfile(userId, tokenStorage);
            if (!fetched.success) {
                setMsgError(fetched.message);
            } else {
                setUserProfile(fetched.data);
                setMsgSuccess(fetched.message);
            }
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="superAdminPanelDesign">
                <div className="error">{msgError}</div>
                <div className="success">{msgSuccess}</div>

                {users.length > 0 ? (
                    <div className="superAdminPanelDesign">
                        {userProfile.id && (
                            <div className="UsersSection">
                                <ProfileCard
                                    user_id={userProfile.id}
                                    first_name={userProfile.first_name}
                                    last_name={userProfile.last_name}
                                    email={userProfile.email}
                                />
                                <CustomInput
                                    className={`inputDesign ${userError.first_nameError ? "inputDesignError" : ""}`}
                                    type="text"
                                    name="first_name"
                                    value={userProfile.first_name}
                                    onChangeFunction={inputHandler}
                                    onBlurFunction={checkError}
                                />
                                <CustomInput
                                    className={`inputDesign ${userError.last_nameError ? "inputDesignError" : ""}`}
                                    type="text"
                                    name="last_name"
                                    value={userProfile.last_name}
                                    onChangeFunction={inputHandler}
                                    onBlurFunction={checkError}
                                />
                                <CustomButton
                                    className="customButtonDesign"
                                    title={`Ver citas de ${userProfile.first_name}`}
                                    functionEmit={() => GetUsersAppointments(userProfile.id)}
                                />
                                <CustomButton
                                    className="customButtonDesign"
                                    title={`Editar perfil de ${userProfile.first_name}`}
                                    functionEmit={() => UpdateUserProfile(userProfile.id)}
                                />
                            </div>
                        )}
                        {users.map((user) => (
                            <div key={user.id} className="UsersSection">
                                <ProfileCard
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    email={user.email}
                                />
                                <CustomButton
                                    className="customButtonDesign"
                                    title={`Borrar a ${user.first_name}`}
                                    functionEmit={() => DeleteUser(user.id)}
                                />
                                <CustomButton
                                    className="customButtonDesign"
                                    title={`Ver perfil de ${user.first_name}`}
                                    functionEmit={() => SeeUserProfile(user.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="superAdminPanelDesign">
                        <p>Los servicios están viniendo</p>
                    </div>
                )}
                {userAppointmentProfile.length > 0 ? (
                    userAppointmentProfile.map((appointment) => (
                        <div key={appointment.id} className="UsersSection">
                            <h2>{`Cita de ${appointment.user.first_name}`}</h2>
                            <AppointmentCard
                                service_id={appointment.service.service_name}
                                appointment_date={appointment.appointment_date}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay citas disponibles</p>
                )}
                <CustomLink
                    destination="/superadminpanelservices"
                    title="Ver servicios de admin"
                />
            </div>
        </>
    );
};
