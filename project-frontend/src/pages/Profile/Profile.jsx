import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import {
  DeleteUserAppointment,
  GetAppointments,
  GetProfile,
  PostAppointment,
  UpdateProfile
} from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [appointmentsCredentials, setAppointmentsCredentials] = useState({
    appointment_date: "",
    service_id: "",
  });
  const [write, setWrite] = useState("disabled");
  const [tokenStorage, setTokenStorage] = useState(""); // Estado inicial vacío
  const [loadedData, setLoadedData] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [userError, setUserError] = useState({
    first_nameError: "",
    last_nameError: "",
    emailError: "",
  });

  // Obtener datos de usuario desde localStorage al inicio
  useEffect(() => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    if (datosUser && datosUser.token) {
      setTokenStorage(datosUser.token);
    } else {
      navigate("/"); // Redireccionar si no hay token almacenado
    }
  }, [navigate]);

  // Obtener citas del usuario
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const fetched = await GetAppointments(tokenStorage);
        setAppointments(fetched.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (tokenStorage && appointments.length === 0) {
      fetchAppointments();
    }
  }, [tokenStorage, appointments]);

  // Obtener perfil del usuario
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetched = await GetProfile(tokenStorage);
        setLoadedData(true);
        setUser({
          first_name: fetched.data.first_name,
          last_name: fetched.data.last_name,
          email: fetched.data.email,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (tokenStorage && !loadedData) {
      fetchUserProfile();
    }
  }, [tokenStorage, loadedData]);

  // Actualizar datos del usuario
  const updateData = async () => {
    try {
      const fetched = await UpdateProfile(tokenStorage, user);
      setUser({
        first_name: fetched.data.first_name,
        last_name: fetched.data.last_name,
        email: fetched.data.email,
      });
      setWrite("disabled");
    } catch (error) {
      console.log(error);
    }
  };

  // Crear una cita
  const createAppointment = async () => {
    try {
      await PostAppointment(tokenStorage, appointmentsCredentials);
      navigate("/profile"); // Redireccionar después de crear la cita
    } catch (error) {
      console.log(error);
    }
  };

  // Eliminar una cita
  const deleteAppointment = async (appointmentId) => {
    try {
      await DeleteUserAppointment(appointmentId, tokenStorage);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Manejar cambios en los inputs de citas
  const appointmentInputHandler = (e) => {
    setAppointmentsCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Manejar cambios en los inputs de usuario
  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Validar inputs de usuario
  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);
    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  return (
    <div className="profileDesign">
      {!loadedData ? (
        <div>CARGANDO</div>
      ) : (
        <div>
          <ProfileCard
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
          />
          <CustomInput
            className={`inputDesign ${userError.first_nameError ? "inputDesignError" : ""}`}
            type="text"
            placeholder=""
            name="first_name"
            disabled={write}
            value={user.first_name}
            onChangeFunction={inputHandler}
            onBlurFunction={checkError}
          />
          <div className="error">{userError.first_nameError}</div>
          <CustomInput
            className={`inputDesign ${userError.last_nameError ? "inputDesignError" : ""}`}
            type="text"
            placeholder=""
            name="last_name"
            disabled={write}
            value={user.last_name}
            onChangeFunction={inputHandler}
            onBlurFunction={checkError}
          />
          <div className="error">{userError.last_nameError}</div>
          <CustomInput
            className={`inputDesign ${userError.emailError ? "inputDesignError" : ""}`}
            type="email"
            placeholder=""
            name="email"
            disabled={true} // Siempre deshabilitado para email
            value={user.email}
            onChangeFunction={inputHandler}
            onBlurFunction={checkError}
          />
          <div className="error">{userError.emailError}</div>
          <CustomButton
            className={write === "" ? "customButtonGreen customButtonDesign" : "customButtonDesign"}
            title={write === "" ? "Confirmar" : "Editar"}
            functionEmit={write === "" ? updateData : () => setWrite("")}
          />
        </div>
      )}

      {/* Renderizar citas */}
      {appointments.map((appointment) => (
        <div key={appointment.id}>
          <AppointmentCard
            service_id={appointment.service.service_name}
            appointment_date={appointment.appointment_date}
          />
          <CustomButton
            className="customButtonDesign"
            title="Borrar cita"
            functionEmit={() => deleteAppointment(appointment.id)}
          />
        </div>
      ))}

      {/* Formulario para crear cita */}
      <pre>{JSON.stringify(appointmentsCredentials, null, 2)}</pre>
      <CustomInput
        className="inputDesign"
        type="date"
        placeholder=""
        name="appointment_date"
        value={appointmentsCredentials.appointment_date}
        onChangeFunction={appointmentInputHandler}
      />
      <CustomInput
        className="inputDesign"
        type="text"
        placeholder=""
        name="service_id"
        value={appointmentsCredentials.service_id}
        onChangeFunction={appointmentInputHandler}
      />
      <CustomButton
        className="customButtonGreen"
        title="Crear cita"
        functionEmit={createAppointment}
      />
    </div>
  );
};
