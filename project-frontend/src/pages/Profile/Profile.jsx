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
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [appointmentsCredentials, setAppointmentsCredentials] = useState({
    appointment_date: "",
    service_id: "",
  });
  const [write, setWrite] = useState("disabled");
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
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

  // Handler for appointment inputs
  const appointmentInputHandler = (e) => {
    setAppointmentsCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handler for user inputs
  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Validate user input
  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);
    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  // Fetch appointments if not already loaded
  useEffect(() => {
    const bringAppointments = async () => {
      try {
        const fetched = await GetAppointments(tokenStorage);
        setAppointments(fetched.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (appointments.length === 0) {
      bringAppointments();
    }
  }, [appointments, tokenStorage]);

  // Redirect to home if no token is present
  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage, navigate]);

  // Fetch user profile if not already loaded
  useEffect(() => {
    const getUserProfile = async () => {
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

    if (!loadedData) {
      getUserProfile();
    }
  }, [loadedData, tokenStorage]);

  // Update user data
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

  // Create an appointment
  const createAppointment = async () => {
    try {
      await PostAppointment(tokenStorage, appointmentsCredentials);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  // Delete an appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      const fetched = await DeleteUserAppointment(appointmentId, tokenStorage);
      console.log(fetched.message);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.log(error);
    }
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
            value={user.first_name || ""}
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
            value={user.last_name || ""}
            onChangeFunction={inputHandler}
            onBlurFunction={checkError}
          />
          <div className="error">{userError.last_nameError}</div>
          <CustomInput
            className={`inputDesign ${userError.emailError ? "inputDesignError" : ""}`}
            type="email"
            placeholder=""
            name="email"
            disabled="disabled"
            value={user.email || ""}
            onChangeFunction={inputHandler}
            onBlurFunction={checkError}
          />
          <div className="error">{userError.emailError}</div>
          <CustomButton
            className={write === "" ? "customButtonGreen customButtonDesign" : "customButtonDesign"}
            title={write === "" ? "Confirm" : "Edit"}
            functionEmit={write === "" ? updateData : () => setWrite("")}
          />
        </div>
      )}
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
      <pre>{JSON.stringify(appointmentsCredentials, null, 2)}</pre>
      <CustomInput
        className="inputDesign"
        type="date"
        placeholder=""
        name="appointment_date"
        value={appointmentsCredentials.appointment_date || ""}
        onChangeFunction={appointmentInputHandler}
      />
      <CustomInput
        className="inputDesign"
        type="text"
        placeholder=""
        name="service_id"
        value={appointmentsCredentials.service_id || ""}
        onChangeFunction={appointmentInputHandler}
      />
      <CustomButton
        className="customButtonGreen"
        title="Create appointment"
        functionEmit={createAppointment}
      />
    </div>
  );
};
