import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { userDataCheck } from "../../pages/userSlice";
import { bringArtists, createAppointment, searchCustomerPayment } from "../../services/apiCalls";
import { loadPaymentData } from "../paymentSlice";
import "./AppointmentAdd.css";

export const AppointmentAdd = () => {
  const reduxUserData = useSelector(userDataCheck);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerId = reduxUserData?.credentials?.userData?.userId;
  const tokenPayment = reduxUserData.credentials.token;

  const [newAppointmentBody, setNewAppointmentBody] = useState({
    user_id: reduxUserData?.credentials?.userData?.roleId === 1 ? "" : customerId,
    artist_id: "",
    date: "",
    hour: "",
  });

  const [cardSecurity, setCardSecurity] = useState({
    safeNumber: "",
  });

  const [artists, setArtists] = useState([]);

  // Redirección basada en el rol del usuario
  useEffect(() => {
    if (reduxUserData.credentials?.userData?.roleId !== 1 && reduxUserData.credentials?.userData?.roleId !== 2) {
      navigate("/");
    }
  }, [reduxUserData, navigate]);

  // Obtiene los datos de pago del cliente
  useEffect(() => {
    if (tokenPayment) {
      searchCustomerPayment(customerId, tokenPayment)
        .then((results) => dispatch(loadPaymentData({ paymentDataData: results })))
        .catch((error) => console.error("Error fetching payment data:", error));
    }
  }, [customerId, tokenPayment, dispatch]);

  // Obtiene la lista de artistas
  useEffect(() => {
    bringArtists()
      .then((resultado) => setArtists(resultado.data.data))
      .catch((error) => console.error("Error fetching artists:", error));
  }, []);

  const handleArtistChange = (e) => {
    setNewAppointmentBody({
      ...newAppointmentBody,
      artist_id: e.target.value,
    });
  };

  const inputHandler = (e) => {
    setNewAppointmentBody({
      ...newAppointmentBody,
      [e.target.name]: e.target.value,
    });
  };

  const inputHandlerSecurity = (e) => {
    setCardSecurity({
      ...cardSecurity,
      [e.target.name]: e.target.value,
    });
  };

  const registerAppointment = () => {
    createAppointment(newAppointmentBody, reduxUserData.credentials)
      .then(() => navigate("/appointments"))
      .catch((error) => console.error("Error creating appointment:", error));
  };

  return (
    <>
      {reduxUserData?.credentials?.userData?.roleId === 1 ? (
        <div className="container-fluid register">
          <div className="space"></div>
          <div className="row upRowRegister">
            <div className="col-1"></div>
            <div className="col-5">
              {["user_id", "artist_id", "date", "hour"].map((field, index) => (
                <div className="row inputRow" key={index}>
                  <div className="scripting">{field.replace("_", " ").toUpperCase()}</div>
                  <Input
                    type="text"
                    placeholder={`Introduce the ${field.replace("_", " ")}`}
                    value={newAppointmentBody[field]}
                    name={field}
                    className="defaultInput"
                    manejadora={inputHandler}
                  />
                </div>
              ))}
            </div>
            <div className="col-1"></div>
          </div>
          <div className="row downRowRegister">
            <div className="buttonBody" onClick={registerAppointment}>
              Register appointment
            </div>
          </div>
        </div>
      ) : reduxUserData?.credentials?.userData?.roleId === 2 ? (
        <div className="container-fluid registerAppointment">
          <div className="row subheaderRow"></div>
          <div className="row upRowAppointment">
            <div className="col">
              <div className="row inputRow">
                <div className="scripting">Artist</div>
                <select className="artistDropdown" onChange={handleArtistChange}>
                  <option value="">-- Select an Artist --</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              {["date", "hour"].map((field, index) => (
                <div className="row inputRow" key={index}>
                  <div className="scripting">{field.toUpperCase()}</div>
                  <Input
                    type="text"
                    placeholder={`Introduce the ${field}`}
                    value={newAppointmentBody[field]}
                    name={field}
                    className="defaultInput"
                    manejadora={inputHandler}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="row midRowPayment">
            <div className="row price">
              <div className="row inputRow title">
                To make an appointment, a £20 deposit is required
              </div>
            </div>
            <div className="row paymentDataShow">
              <div className="col-2"></div>
              <div className="col">
                <div className="row inputRow title">
                  Card Number: {reduxPaymentData.paymentDataData?.data?.cardNumber}
                </div>
                <div className="row inputRow title">
                  Valid Thru: {reduxPaymentData.paymentDataData?.data?.validThru}
                </div>
              </div>
              <div className="col">
                <div className="row inputRow">
                  <div className="scripting">CVV/CVC</div>
                  <Input
                    type="number"
                    placeholder="Introduce the CVV/CVC number"
                    value={cardSecurity.safeNumber}
                    name="safeNumber"
                    className="defaultInput"
                    manejadora={inputHandlerSecurity}
                  />
                </div>
                <div className="row inputRow title">
                  Please check that your payment details are correct,
                  otherwise you can modify them in your user profile
                </div>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
          <div className="row downRowRegister">
            <div className="buttonBody" onClick={registerAppointment}>
              Register appointment
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
