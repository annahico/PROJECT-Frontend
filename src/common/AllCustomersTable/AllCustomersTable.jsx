import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { getAllCustomers } from "../../services/apiCalls";

export const PrintCustomers = ({ appo }) => {
  const headers = [
    "Customer Name",
    "Customer Surname",
    "Customer Email"
  ];

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Date(dateString).toLocaleString(undefined, options);
  };

  const datosRdxUser = useSelector(userData);
  const [updatedAppointments, setUpdatedAppointments] = useState([]);


  const fetchData = async () => {
    try {
      const response = await getAllCustomers(datosRdxUser.credentials);
      setUpdatedAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() =>{
    fetchData()
  }, []);  

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(appo) &&
          appo.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.name}</td>
              <td>{appointment.surname}</td>
              <td>{appointment.email}</td>
              <td>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};