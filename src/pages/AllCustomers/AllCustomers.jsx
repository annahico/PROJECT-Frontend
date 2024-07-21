import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCustomers } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { PrintCustomers } from "../../common/AllCustomersTable/AllCustomersTable";
import "./AllCustomers.css";


export const AllCustomers = () => {
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
          const response = await getAllCustomers(datosRdxUser.credentials.token);
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
    <div className="allCustomersDesign">
      <h2>ALL CUSTOMERS</h2>
      <PrintCustomers appo={appointments} />
    </div>
  );
};