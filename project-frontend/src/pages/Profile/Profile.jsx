import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { GetAppointments, GetProfile, PostAppointment, UpdateProfile } from "../../services/apiCalls";
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

  const appointmentInputHandler = (e) => {
    setAppointmentsCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [write, setWrite] = useState("disabled");
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

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);
    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  useEffect(() => {
    if (appointments.length === 0) {
      const bringData = async () => {
        try {
          const fetched = await GetAppointments(datosUser.token);
          setAppointments(fetched.data);
        } catch (error) {
          console.log(error);
        }
      };
      bringData();
    }
  }, [appointments, datosUser.token]);

  useEffect(() => {
    if (!datosUser?.token) {
      navigate("/");
    }
  }, [datosUser, navigate]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const fetched = await GetProfile(datosUser.token);
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
  }, [loadedData, datosUser.token]);

  const updateData = async () => {
    try {
      const fetched = await UpdateProfile(datosUser.token, user);
      setUser({
        first_name: fetched.dataFetched.first_name,
        last_name: fetched.dataFetched.last_name,
        email: fetched.dataFetched.email,
      });
      setWrite("disabled");
    } catch (error) {
      console.log(error);
    }
  };

  const createAppointment = async () => {
    try {
      await PostAppointment(datosUser.token, appointmentsCredentials);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profileDesign">
      {!loadedData ? (
        <div>CARGANDO</div>
      ) : (
        <>
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
        </>
      )}
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          service_id={appointment.service.service_name}
          appointment_date={appointment.appointment_date}
        />
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
