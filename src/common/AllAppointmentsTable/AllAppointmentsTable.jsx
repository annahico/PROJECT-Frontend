import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { getAllAppointments } from "../../services/apiCalls";

export const PrintAppointments = ({ appo }) => {
  const headers = [
    "Artist Name",
    "Artist Surname",
    "Artist Email",
    "Customer Name",
    "Customer Surname",
    "Customer Email",
    "Date",
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
      const response = await getAllAppointments(datosRdxUser.credentials);
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
              <td>{appointment.tattoo_artist.name}</td>
              <td>{appointment.tattoo_artist.surname}</td>
              <td>{appointment.tattoo_artist.email}</td>
              <td>{appointment.customer.name}</td>
              <td>{appointment.customer.surname}</td>
              <td>{appointment.customer.email}</td>
              <td>{formatDate(appointment.date)}</td>
              <td>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};