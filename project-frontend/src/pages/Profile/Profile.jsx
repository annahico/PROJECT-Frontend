import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import {
  DeleteUserAppointment,
  GetAppointments,
  GetProfile,
  PostAppointment,
  UpdateProfile,
} from "../../services/apiCalls";
import "./Profile.css";

export const Profile = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport")); // Obtener datos de usuario almacenados en localStorage
  const navigate = useNavigate(); // Hook para navegación en React Router

  const [appointments, setAppointments] = useState([]); // Estado para almacenar las citas del usuario
  const [appointmentsCredentials, setAppointmentsCredentials] = useState({ // Estado para las credenciales de la nueva cita
    appointment_date: "",
    service_id: "",
  });

  const [write, setWrite] = useState(true); // Estado para controlar el modo de edición del perfil

  const [tokenStorage, setTokenStorage] = useState(datosUser?.token); // Estado para almacenar el token de usuario
  const [loadedData, setLoadedData] = useState(false); // Estado para indicar si los datos del usuario han sido cargados

  const [user, setUser] = useState({ // Estado para almacenar los datos del usuario
    first_name: "",
    last_name: "",
    email: "",
  });

  const [userError, setUserError] = useState({ // Estado para manejar los errores de validación del usuario
    first_nameError: "",
    last_nameError: "",
    emailError: "",
  });

  useEffect(() => {
    // Efecto para redirigir al usuario a la página de inicio si no hay token
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage, navigate]);

  useEffect(() => {
    // Efecto para cargar las citas del usuario solo cuando no están cargadas previamente
    const fetchAppointments = async () => {
      try {
        const fetched = await GetAppointments(tokenStorage); // Llamada a la API para obtener citas
        setAppointments(fetched.data); // Actualizar el estado con las citas obtenidas
      } catch (error) {
        console.log("Error fetching appointments:", error);
      }
    };

    if (appointments.length === 0) { // Verificar si no hay citas cargadas
      fetchAppointments(); // Llamar a la función para cargar las citas
    }
  }, [appointments, tokenStorage]);

  useEffect(() => {
    // Efecto para cargar el perfil del usuario cuando se monta el componente
    const fetchUserProfile = async () => {
      try {
        const fetched = await GetProfile(tokenStorage); // Llamada a la API para obtener perfil de usuario
        setUser({ // Actualizar el estado con los datos del usuario obtenidos
          first_name: fetched.data.first_name,
          last_name: fetched.data.last_name,
          email: fetched.data.email,
        });
        setLoadedData(true); // Marcar que los datos han sido cargados
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    if (!loadedData) { // Verificar si los datos aún no han sido cargados
      fetchUserProfile(); // Llamar a la función para cargar el perfil del usuario
    }
  }, [loadedData, tokenStorage]);

  const handleInput = (e) => {
    // Función para manejar cambios en los campos del perfil
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputBlur = (e) => {
    // Función para manejar la validación de los campos del perfil (a implementar)
    const { name, value } = e.target;
    const error = validateInput(name, value); // Llamar a función de validación (a implementar)
    setUserError((prevState) => ({
      ...prevState,
      [`${name}Error`]: error,
    }));
  };

  const updateProfile = async () => {
    // Función para actualizar el perfil del usuario
    try {
      const fetched = await UpdateProfile(tokenStorage, user); // Llamada a la API para actualizar perfil
      setUser({ // Actualizar el estado con los nuevos datos del perfil
        first_name: fetched.data.first_name,
        last_name: fetched.data.last_name,
        email: fetched.data.email,
      });
      setWrite(true); // Habilitar el modo de edición después de la actualización
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const createAppointment = async () => {
    // Función para crear una nueva cita
    try {
      await PostAppointment(tokenStorage, appointmentsCredentials); // Llamada a la API para crear cita
      navigate("/profile"); // Redirigir a la página de perfil después de crear la cita
    } catch (error) {
      console.log("Error creating appointment:", error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    // Función para eliminar una cita existente
    try {
      await DeleteUserAppointment(appointmentId, tokenStorage); // Llamada a la API para eliminar cita
      const updatedAppointments = appointments.filter( // Filtrar las citas para remover la cita eliminada
        (appointment) => appointment.id !== appointmentId
      );
      setAppointments(updatedAppointments); // Actualizar el estado con las citas restantes
    } catch (error) {
      console.log("Error deleting appointment:", error);
    }
  };

  return (
    <>
      <Header /> {/* Componente de encabezado común */}
      <div className="profileDesign">
        {!loadedData ? ( // Mostrar mensaje de carga si los datos aún no están disponibles
          <div>CARGANDO</div>
        ) : (
          <div>
            <ProfileCard // Componente para mostrar el perfil del usuario
              first_name={user.first_name}
              last_name={user.last_name}
              email={user.email}
            />

            <CustomInput // Campo de entrada para el nombre
              className={`inputDesign ${
                userError.first_nameError ? "inputDesignError" : ""
              }`}
              type="text"
              placeholder=""
              name="first_name"
              disabled={!write}
              value={user.first_name}
              onChange={handleInput}
              onBlur={handleInputBlur}
            />
            <div className="error">{userError.first_nameError}</div>

            <CustomInput // Campo de entrada para el apellido
              className={`inputDesign ${
                userError.last_nameError ? "inputDesignError" : ""
              }`}
              type="text"
              placeholder=""
              name="last_name"
              disabled={!write}
              value={user.last_name}
              onChange={handleInput}
              onBlur={handleInputBlur}
            />
            <div className="error">{userError.last_nameError}</div>

            <CustomInput // Campo de entrada para el correo electrónico (desactivado)
              className="inputDesign"
              type="email"
              placeholder=""
              name="email"
              disabled
              value={user.email}
              onChange={handleInput}
            />

            <CustomButton // Botón para editar o confirmar la edición del perfil
              className="customButtonDesign"
              title={write ? "Edit" : "Confirm"}
              functionEmit={write ? () => setWrite(false) : updateProfile}
            />
          </div>
        )}

        {appointments.map((appointment) => ( // Renderizado de las citas del usuario
          <div key={appointment.id}>
            <AppointmentCard // Componente para mostrar detalles de cada cita
              service_id={appointment.service.service_name}
              appointment_date={appointment.appointment_date}
            />
            <CustomButton // Botón para eliminar una cita específica
              className="customButtonDesign"
              title="Delete appointment"
              functionEmit={() => deleteAppointment(appointment.id)}
            />
          </div>
        ))}

        <CustomInput // Campo de entrada para la fecha de la nueva cita
          className="inputDesign"
          type="date"
          placeholder=""
          name="appointment_date"
          value={appointmentsCredentials.appointment_date}
          onChange={handleInput}
        />

        <CustomInput // Campo de entrada para el ID del servicio de la nueva cita
          className="inputDesign"
          type="text"
          placeholder=""
          name="service_id"
          value={appointmentsCredentials.service_id}
          onChange={handleInput}
        />

        <CustomButton // Botón para crear una nueva cita
          className="customButtonGreen"
          title="Create appointment"
          functionEmit={createAppointment}
        />
      </div>
    </>
  );
};

// Función de validación de entrada (a implementar según requisitos específicos)
const validateInput = (name, value) => {
  // Implementar lógica de validación según los campos del perfil
  return value.trim() === "" ? `${name} is required` : "";
};
