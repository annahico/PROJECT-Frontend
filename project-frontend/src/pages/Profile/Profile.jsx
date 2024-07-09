import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../common/Header/Header";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { DeleteUserAppointment, GetAppointments, GetProfile, PostAppointment, UpdateProfile } from "../../services/apiCalls";
// import { validame } from "../../utils/functions";
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
  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const appointmentInputHandler = (e) => {
    setAppointmentsCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
      const fetchAppointments = async () => {
        try {
          const fetched = await GetAppointments(tokenStorage);
          setAppointments(fetched.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAppointments();
    }
  }, [appointments, tokenStorage]);

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage, navigate]);

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
    if (!loadedData) {
      fetchUserProfile();
    }
  }, [loadedData, tokenStorage]);

  const updateData = async () => {
    try {
      setLoading(true);
      const fetched = await UpdateProfile(tokenStorage, user);
      setMsgSuccess(fetched.message);
      setLoading(false);
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
      for (let key in appointmentsCredentials) {
        if (appointmentsCredentials[key] === "") {
          throw new Error("All fields must be filled");
        }
      }
      setLoading(true);
      const fetched = await PostAppointment(tokenStorage, appointmentsCredentials);
      setMsgSuccess(fetched.message);
      setLoading(false);
      navigate("/profile");
      setAppointments((prev) => [...prev, fetched.data]);
    } catch (error) {
      setMsgError(error.message);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const fetched = await DeleteUserAppointment(appointmentId, tokenStorage);
      setMsgSuccess(fetched.message);
      setAppointments((prev) => prev.filter((app) => app.id !== appointmentId));
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="profileDesign">
        <div className="error">{msgError}</div>
        <div className="success">{msgSuccess}</div>
        {loading && <span>Loading...</span>}
        {!loadedData ? (
          <div>Loading...</div>
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
              placeholder="First Name"
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
              placeholder="Last Name"
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
              placeholder="Email"
              name="email"
              disabled="disabled"
              value={user.email}
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
              title="Delete Appointment"
              functionEmit={() => deleteAppointment(appointment.id)}
            />
          </div>
        ))}
        <pre>{JSON.stringify(appointmentsCredentials, null, 2)}</pre>
        <CustomInput
          className="inputDesign"
          type="date"
          placeholder="Appointment Date"
          name="appointment_date"
          value={appointmentsCredentials.appointment_date}
          onChangeFunction={appointmentInputHandler}
        />
        <CustomInput
          className="inputDesign"
          type="text"
          placeholder="Service ID"
          name="service_id"
          value={appointmentsCredentials.service_id}
          onChangeFunction={appointmentInputHandler}
        />
        <CustomButton
          className="customButtonGreen"
          title="Create Appointment"
          functionEmit={createAppointment}
        />
      </div>
    </>
  );
};
