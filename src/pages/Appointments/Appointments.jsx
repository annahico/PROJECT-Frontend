import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppointmentCard } from "../../common/AppointmentCard/AppointmentCard";
import { userDataCheck } from "../../pages/userSlice";
import {
  bringAllAppointments,
  bringArtistAppointments,
  bringCustomerAppointments,
  searchPortfolio,
} from "../../services/apiCalls";
import "./Appointments.css";

export const Appointments = () => {
  // Instanciamos Redux en modo LECTURA para user
  const reduxUserData = useSelector(userDataCheck);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const userId = reduxUserData?.credentials?.userData?.userId;
  const userRoleId = reduxUserData?.credentials?.userData?.roleId;

  useEffect(() => {
    if (![1, 2, 3].includes(userRoleId)) {
      navigate("/");
    }
  }, [userRoleId, navigate]);

  useEffect(() => {
    if (appointments.length === 0 && userRoleId) {
      switch (userRoleId) {
        case 1:
          bringAllAppointments(reduxUserData.credentials)
            .then((resultado) => {
              setAppointments(resultado.data.data);
            })
            .catch((error) => console.log(error));
          break;

        case 2:
          bringCustomerAppointments(userId, reduxUserData.credentials)
            .then((resultado) => {
              setAppointments(resultado.data.data);
            })
            .catch((error) => console.log(error));
          break;

        case 3:
          searchPortfolio(userId, reduxUserData.credentials).then((results) => {
            const artistId = results.data.data[0]?.id;
            if (artistId) {
              bringArtistAppointments(artistId, reduxUserData.credentials)
                .then((resultado) => {
                  setAppointments(resultado.data.data);
                })
                .catch((error) => console.log(error));
            }
          });
          break;

        default:
          break;
      }
    }
  }, [appointments, userRoleId, userId, reduxUserData.credentials]);

  const updateMe = () => {
    if (userRoleId === 1) {
      bringAllAppointments(reduxUserData.credentials)
        .then((resultado) => {
          setAppointments(resultado.data.data);
        })
        .catch((error) => console.log(error));
    } else if (userRoleId === 2) {
      bringCustomerAppointments(userId, reduxUserData.credentials)
        .then((resultado) => {
          setAppointments(resultado.data.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const renderAppointmentCards = () => (
    <div className="infinite-scroll-container">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          id={appointment.id}
          artist_name={appointment.Artist.name}
          artist_id={appointment.Artist.id}
          date={appointment.date}
          hour={appointment.hour}
          appointment={appointment}
          user_name={appointment.User.name}
          user_surnames={appointment.User.surnames}
          user_email={appointment.User.email}
          user_phone={appointment.User.phone}
          update={updateMe}
        />
      ))}
    </div>
  );

  return (
    <>
      {userRoleId !== 3 && (
        <>
          <div className="subHeader">
            <div
              className="subheaderButton"
              onClick={() => navigate("/appointmentadd")}
            >
              Make Appointment
            </div>
          </div>
          {appointments.length > 0 ? renderAppointmentCards() : (
            <div className="appointments">
              <div className="title">
                No designs found, click on make appointment if you want to set
                an appointment
              </div>
            </div>
          )}
        </>
      )}
      {userRoleId === 3 && (
        <>
          {appointments.length > 0 ? renderAppointmentCards() : (
            <div className="appointments">
              <div className="title">
                No designs found, click on make appointment if you want to set
                an appointment
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
