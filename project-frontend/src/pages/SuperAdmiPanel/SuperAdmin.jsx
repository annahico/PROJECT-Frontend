import { useCallback, useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { DeleteUsers, GetAppointmentsUsersProfile, GetUsers, SeeUsersProfile } from "../../services/apiCalls";
import "./SuperAdmin.css";

export const SuperAdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: ""
  });
  const [userAppointmentProfile, setUserAppointmentProfile] = useState([]);
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const [tokenStorage] = useState(datosUser?.token);

  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");

  // Get Users
  const bringData = useCallback(async () => {
    try {
      const fetched = await GetUsers(tokenStorage);
      setUsers(fetched.data);
    } catch (error) {
      console.log(error);
    }
  }, [tokenStorage]);

  useEffect(() => {
    if (users.length === 0) {
      bringData();
    }
  }, [users, bringData]);

  // Delete User
  const deleteUser = async (userId) => {
    try {
      const fetched = await DeleteUsers(userId, tokenStorage);
      if (!fetched.success) {
        setMsgError(fetched.message);
      } else {
        setMsgSuccess(fetched.message);
        bringData();
      }
    } catch (error) {
      setMsgError(error.message);
    }
  };

  // Get User Appointments
  const getUsersAppointments = async (userId) => {
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

  // See User Profile
  const seeUserProfile = async (userId) => {
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
          <div>
            {userProfile.id && (
              <>
                <ProfileCard
                  user_id={userProfile.id}
                  first_name={userProfile.first_name}
                  last_name={userProfile.last_name}
                  email={userProfile.email}
                />
                <CustomButton
                  className="customButtonDesign"
                  title={`Ver citas de ${userProfile.first_name}`}
                  functionEmit={() => getUsersAppointments(userProfile.id)}
                />
              </>
            )}

            {users.map((user) => (
              <div key={user.id}>
                <ProfileCard
                  first_name={user.first_name}
                  last_name={user.last_name}
                  email={user.email}
                />
                <CustomButton
                  className="customButtonDesign"
                  title={`Borrar a ${user.first_name}`}
                  functionEmit={() => deleteUser(user.id)}
                />
                <CustomButton
                  className="customButtonDesign"
                  title={`Ver perfil de ${user.first_name}`}
                  functionEmit={() => seeUserProfile(user.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>Los servicios están viniendo</p>
          </div>
        )}

        {userAppointmentProfile.length > 0 && (
          <div>
            {userAppointmentProfile.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                service_id={appointment.service_id}
                appointment_date={appointment.appointment_date}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
