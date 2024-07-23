import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Print } from "../../common/MyDatesTable/MyDatesTable";
import { myDates } from "../../services/apiCalls";
import { userData } from "../userSlice";
import "./MyDates.css";

export const MyDates = () => {
  const navigate = useNavigate();
  const datosRdxUser = useSelector(userData);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!datosRdxUser.credentials) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await myDates(datosRdxUser.credentials.token);
        setAppointments(response.data.data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [datosRdxUser.credentials, navigate]);

  return (
    <div className="myDatesDesign">
      <h2>MY DATES</h2>
      <Print appo={appointments} />
    </div>
  );
};
