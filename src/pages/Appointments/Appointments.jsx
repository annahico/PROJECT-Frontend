import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { useAuth } from "../../context/AuthContext";
import { createAppointment, deleteAppointmentById, getAllAppointments, updateAppointmentById } from "../../services/appointment";
import { getAllArtists } from "../../services/artist";
import { getAllServices } from "../../services/services";
import "./Appointments.css";

export default function Appointments({ isAdmin }) {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [artists, setArtists] = useState([]);
  const [appointmentForm, setAppointmentForm] = useState({ appointment_date: "", service_id: "", artist_id: "" });
  const [error, setError] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const navigate = useNavigate();
  const { userToken } = useAuth();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
      return;
    }

    const token = userToken.token;

    const fetchAppointments = async () => {
      try {
        const response = await getAllAppointments(token);
        if (response.success) {
          setAppointments(response.data);
        } else {
          setError("Error fetching appointments.");
        }
      } catch (err) {
        setError("Error fetching appointments.");
      }
    };

    const fetchServices = async () => {
      try {
        const response = await getAllServices(token);
        if (response.success) {
          setServices(response.data);
        } else {
          setError("Error fetching services.");
        }
      } catch (err) {
        setError("Error fetching services.");
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await getAllArtists(token);
        if (response.success) {
          setArtists(response.data);
        } else {
          setError("Error fetching artists.");
        }
      } catch (err) {
        setError("Error fetching artists.");
      }
    };

    fetchAppointments();
    fetchServices();
    fetchArtists();
  }, [userToken, navigate]);

  const handleCreateAppointment = async () => {
    try {
      const response = await createAppointment(appointmentForm, userToken.token);
      if (response.success) {
        setAppointments([...appointments, response.data]);
        setAppointmentForm({ appointment_date: "", service_id: "", artist_id: "" });
      } else {
        setError("Error creating appointment.");
      }
    } catch (error) {
      setError("Error creating appointment.");
    }
  };

  const handleEditAppointmentChange = (e) => {
    setAppointmentForm({ ...appointmentForm, [e.target.name]: e.target.value || "" });
  };

  const handleEditAppointmentClick = (appointment) => {
    setEditingAppointment(appointment.id);
    setAppointmentForm({
      appointment_date: appointment.appointment_date,
      service_id: appointment.service_id || "",
      artist_id: appointment.artist_id || ""
    });
  };

  const handleEditAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAppointmentById({ id: editingAppointment, ...appointmentForm }, userToken.token);
      if (response.success) {
        const updatedAppointments = appointments.map(appointment =>
          appointment.id === editingAppointment ? { ...appointment, ...appointmentForm } : appointment
        );
        setAppointments(updatedAppointments);
        setEditingAppointment(null);
      } else {
        setError("Error updating appointment.");
      }
    } catch (error) {
      setError("Error updating appointment.");
    }
  };

  const handleDeleteAppointmentClick = async (appointmentId) => {
    try {
      const response = await deleteAppointmentById(appointmentId, userToken.token);
      if (response.success) {
        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
      } else {
        setError("Error deleting appointment.");
      }
    } catch (error) {
      setError("Error deleting appointment.");
    }
  };

  return (
    <>
      <Header />
      <Container>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" className="my-4" onClick={() => setEditingAppointment(null)}>
          Create Appointment
        </Button>
        <Row>
          {appointments.map((appointment) => (
            <Col key={appointment.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {new Date(appointment.appointment_date).toLocaleString()}
                    <Button className="ms-2" onClick={() => handleEditAppointmentClick(appointment)}>Edit</Button>
                    <Button className="ms-2" onClick={() => handleDeleteAppointmentClick(appointment.id)}>Delete</Button>
                  </Card.Title>
                  <Card.Text>ID User: {appointment.user.id}</Card.Text>
                  <Card.Text>User: {appointment.user.first_name} {appointment.user.last_name}</Card.Text>
                  <Card.Text>
                    Service: {services.find(service => service.id === appointment.service_id)?.service_name || "Not assigned"}
                  </Card.Text>
                  <Card.Text>
                    Artist: {artists.find(artist => artist.id === appointment.artist_id)?.name || "Not assigned"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Form className="my-4" onSubmit={handleEditAppointmentSubmit}>
          <Form.Group controlId="formAppointmentDate">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control 
              type="datetime-local" 
              name="appointment_date"
              value={appointmentForm.appointment_date}
              onChange={handleEditAppointmentChange} 
            />
          </Form.Group>
          <Form.Group controlId="formServiceId">
            <Form.Label>Service</Form.Label>
            <Form.Control 
              as="select" 
              name="service_id"
              value={appointmentForm.service_id}
              onChange={handleEditAppointmentChange}
            >
              <option value="">Select Service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.service_name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formArtistId">
            <Form.Label>Artist</Form.Label>
            <Form.Control 
              as="select" 
              name="artist_id"
              value={appointmentForm.artist_id}
              onChange={handleEditAppointmentChange}
            >
              <option value="">Select Artist</option>
              {artists.map(artist => (
                <option key={artist.id} value={artist.id}>{artist.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            {editingAppointment ? "Update Appointment" : "Create Appointment"}
          </Button>
        </Form>
      </Container>
    </>
  );
}
