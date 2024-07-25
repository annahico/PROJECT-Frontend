import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Corrected import
import {
  getAllAppointments,
  getUserAppointments
} from "../../services/appointment";
import {
  getAllArtists
} from "../../services/artist";
import { getAllServices } from "../../services/services";
import {
  getAllUsers,
  updateProfile // Changed from getUser to updateProfile
} from "../../services/user";
import "./User.css";

export default function User({ isAdmin }) {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [showArtists, setShowArtists] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ first_name: "", last_name: "", email: "" });
  const [editArtistForm, setEditArtistForm] = useState({ name: "", Bio: "", Specialty: "" });
  const [error, setError] = useState(null);
  const [showArtistForm, setShowArtistForm] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ appointment_date: "", service_id: "", artist_id: "" });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const navigate = useNavigate();
  const { userToken, logout } = useAuth(); 

  useEffect(() => {
    if (!userToken?.token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, usersRes, artistsRes, servicesRes, appointmentsRes] = await Promise.all([
          getProfile(userToken.token), // Changed from getUser to getProfile
          isAdmin ? getAllUsers(userToken.token) : Promise.resolve({ success: false }),
          getAllArtists(userToken.token),
          getAllServices(userToken.token),
          isAdmin ? getAllAppointments(userToken.token) : getUserAppointments(userToken.decoded.userId, userToken.token),
        ]);

        setUserData(profileRes.success ? profileRes.data : null);
        setEmail(profileRes.success ? profileRes.data.email : "");
        if (usersRes.success && Array.isArray(usersRes.data)) setUsers(usersRes.data);
        if (artistsRes.success && Array.isArray(artistsRes.data)) setArtists(artistsRes.data);
        if (servicesRes.success && Array.isArray(servicesRes.data)) setServices(servicesRes.data);
        if (appointmentsRes.success) setUserAppointments(appointmentsRes.data);

        if (!profileRes.success || !usersRes.success || !artistsRes.success || !servicesRes.success || !appointmentsRes.success) {
          setError("Error fetching data.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching data.");
      }
    };

    fetchData();
  }, [userToken, navigate, isAdmin]);

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleFormChange = (setter) => (e) => setter(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submitUserChanges = async () => {
    try {
      const response = await updateProfile(userData, userToken.token);
      if (response.success) setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEntityAction = async (entity, action, params) => {
    try {
      const response = await action(params, userToken.token);
      if (response.success) {
        switch (entity) {
          case 'user':
            setUsers(prev => prev.map(u => u.id === params.id ? { ...u, ...params } : u));
            setFilteredUsers(prev => prev.map(u => u.id === params.id ? { ...u, ...params } : u));
            break;
          case 'artist':
            setArtists(prev => prev.map(a => a.id === params.id ? { ...a, ...params } : a));
            break;
          case 'appointment':
            setUserAppointments(prev => prev.map(a => a.id === params.id ? { ...a, ...params } : a));
            break;
        }
      } else {
        setError(`Error ${action.name.replace(/ById$/, '')} ${entity}: ${response.message}`);
      }
    } catch (error) {
      setError(`Error ${action.name.replace(/ById$/, '')} ${entity}.`);
    }
  };

  const handleDelete = (entity, deleteAction) => async (id) => {
    await handleEntityAction(entity, deleteAction, { id });
  };

  return (
    <Container>
      <Navbar bg="light">
        <Navbar.Brand href="#home">User Management</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => setShowUsers(!showUsers)}>Users</Nav.Link>
          <Nav.Link onClick={() => setShowArtists(!showArtists)}>Artists</Nav.Link>
          <Nav.Link onClick={() => setShowAppointments(!showAppointments)}>Appointments</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={email} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => setEditing(true)}>Edit Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>

      {editing && (
        <Card>
          <Card.Body>
            <h5>Edit Profile</h5>
            <Form>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userData?.first_name || ''}
                  onChange={handleFormChange((value) => setUserData(prev => ({ ...prev, first_name: value })))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userData?.last_name || ''}
                  onChange={handleFormChange((value) => setUserData(prev => ({ ...prev, last_name: value })))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={userData?.email || ''}
                  onChange={handleFormChange((value) => setUserData(prev => ({ ...prev, email: value })))}
                />
              </Form.Group>
              <Button onClick={submitUserChanges}>Save Changes</Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {showUsers && (
        <Card>
          <Card.Body>
            <h5>Users</h5>
            {/* Render user list and actions */}
          </Card.Body>
        </Card>
      )}

      {showArtists && (
        <Card>
          <Card.Body>
            <h5>Artists</h5>
            {/* Render artist list and actions */}
          </Card.Body>
        </Card>
      )}

      {showAppointments && (
        <Card>
          <Card.Body>
            <h5>Appointments</h5>
            {/* Render appointments list and actions */}
          </Card.Body>
        </Card>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
}
