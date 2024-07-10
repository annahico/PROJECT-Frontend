import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../common/Header/Header";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { DeleteUserAppointment, GetAppointments, GetProfile, GetServices, PostAppointment, UpdateProfile } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import "./Profile.css";

export const Profile = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
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
  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

  const appointmentInputHandler = (e) => {
    setAppointmentsCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const BringServicesData = async () => {
    try {
      const fetched = await GetServices();
      setServices(fetched.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (services.length === 0) {
      BringServicesData();
    }
  }, [services]);

  const BringAppointmentsData = async () => {
    try {
      const fetched = await GetAppointments(tokenStorage);
      setAppointments(fetched.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (appointments.length === 0) {
      BringAppointmentsData();
    }
  }, [appointments]);

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage, navigate]);

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

  const updateData = async () => {
    try {
      setLoading(true);
      const fetched = await UpdateProfile(tokenStorage, user);
      setMsgSuccess(fetched.message);
      setLoading(false);
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

  const createAppointment = async () => {
    try {
      for (let key in appointmentsCredentials) {
        if (appointmentsCredentials[key] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }
      setLoading(true);
      const fetched = await PostAppointment(tokenStorage, appointmentsCredentials);
      setLoading(false);
      setMsgSuccess(fetched.message);
      BringAppointmentsData();
    } catch (error) {
      setMsgError(error.message);
    }
  };

  const DeleteAppointment = async (appointmentId) => {
    try {
      const fetched = await DeleteUserAppointment(appointmentId, tokenStorage);
      setMsgSuccess(fetched.message);
      BringAppointmentsData();
    } catch (error) {
      setMsgError(error);
    }
  };

  return (
    <>
      <Header />
      <div className="profileDesign">
        <div className="statusInfo">
          <div className="error">{msgError}</div>
          <div className="success">{msgSuccess}</div>
        </div>
        {loading && <span>Loading...</span>}
        {!loadedData ? (
          <div>CARGANDO</div>
        ) : (
          <div>
            <h3>TU PERFIL</h3>
            <ProfileCard
              first_name={`Nombre: ${user.first_name}`}
              last_name={`Apellidos: ${user.last_name}`}
              email={`Email: ${user.email}`}
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
              disabled="disabled"
              value={user.email}
              onChangeFunction={inputHandler}
              onBlurFunction={checkError}
            />
            <div className="error">{userError.emailError}</div>
            <CustomButton
              className="customButtonDesign"
              title={write === "" ? "Confirm" : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            />
          </div>
        )}
        <div className="UsersSection">
          <h3>TUS CITAS</h3>
          {appointments.map((appointment) => (
            <div key={appointment.id}>
              <AppointmentCard
                service_id={appointment.service.service_name}
                appointment_date={appointment.appointment_date}
              />
              <CustomButton
                className="customButtonDesign"
                title="Borrar cita"
                functionEmit={() => DeleteAppointment(appointment.id)}
              />
            </div>
          ))}
        </div>
        <div className="UsersSection">
          <h3>CREAR CITA</h3>
          <CustomInput
            className="inputDesign"
            type="datetime-local"
            placeholder=""
            name="appointment_date"
            value={appointmentsCredentials.appointment_date}
            onChangeFunction={appointmentInputHandler}
          />
          {services.length > 0 ? (
            <select className="inputDesign" name="service_id" onChange={appointmentInputHandler}>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.service_name}
                </option>
              ))}
            </select>
          ) : (
            <p>Los servicios están viniendo</p>
          )}
          <CustomButton
            className="customButtonDesign"
            title="Crear cita"
            functionEmit={createAppointment}
          />
          {loading && <img src="/imgs/loadingspinner.gif" height="34em" width="34em" alt="Loading" />}
        </div>
      </div>
    </>
  );
};
