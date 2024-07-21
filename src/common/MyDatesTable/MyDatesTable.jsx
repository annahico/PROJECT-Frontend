import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { myDates, deleteMyDates } from "../../services/apiCalls";
import "./MyDatesTable.css";

export const Print = ({ appo }) => {
  const headers = [
    "Artist Name",
    "Artist Surname",
    "Artist Email",
    "Date",
    "Actions",
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
      const response = await myDates(datosRdxUser.credentials);
      setUpdatedAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() =>{
    fetchData()
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMyDates(datosRdxUser.credentials.token);
  
      // Después de la eliminación, actualiza los datos volviendo a llamar a myDates
      const updatedData = await myDates(datosRdxUser.credentials);
      setUpdatedAppointments(updatedData.data);
      fetchData();
    } catch (error) {
      console.log(error);
    }

  };

  

  return (
    <div className="myDatesDesign">
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
              <td>{formatDate(appointment.date)}</td>
              <td>
              <button
                        className="delete"
                        onClick={() => handleDelete(appointment.id)}
                        
                      >
                        Delete
                      </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  );
};