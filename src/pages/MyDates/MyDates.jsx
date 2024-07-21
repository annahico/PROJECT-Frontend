import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { myDates } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { Print } from "../../common/MyDatesTable/MyDatesTable";
import "./MyDates.css";

export const MyDates = () => {
  const navigate = useNavigate();
  const datosRdxUser = useSelector(userData);
  const [appointments, setAppointments] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (!datosRdxUser.credentials) {
      navigate("/");
    } else {
      console.log("mydates");
      const fetchData = async () => {
        try {
          console.log(datosRdxUser.credentials);
          const response = await myDates(datosRdxUser.credentials.token);
          console.log(response);
          if (isMounted) {
            setAppointments(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      if (appointments.length === 0) {
        fetchData();
      }
    }

    return () => {
      setIsMounted(false);
    };
  }, [datosRdxUser, navigate, isMounted, appointments]);

  return (
    <div className="myDatesDesign">
      <h2>MY DATES</h2>
      <Print appo={appointments} />
    </div>
  );
};