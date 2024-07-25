import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useAuth } from "../../context/AuthContext";
import { register } from "../../services/apiCall";
import "./Register.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [registrationErrorMsg, setRegistrationErrorMsg] = useState("");

  const navigate = useNavigate();
  const { logan } = useAuth(); 

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "firstName") {
      setFirstName(value);
    }
  };

  const inputChecker = () => {
    let message = "";

    if (email.trim() === "") {
      message += "Email is required. ";
    }
    if (password.trim() === "") {
      message += "Password is required. ";
    }
    if (firstName.trim() === "") {
      message += "First name is required. ";
    }

    if (message === "") {
      setMsg("Registration successful");
    } else {
      setRegistrationErrorMsg(message);
    }
  };

  const registerHandler = async () => {
    if (email.trim() === "" || password.trim() === "" || firstName.trim() === "") {
      setRegistrationErrorMsg("All fields are required");
      return;
    }

    const newUser = {
      firstName: firstName,
      email: email,
      password: password,
    };

    try {
      const res = await register(newUser);
      if (res && res.token) {
        const userToken = {
          token: res.token,
          decoded: jwtDecode(res.token),
        };

        logan(userToken); 

        setMsg("Registration successful");
        setTimeout(() => {
          navigate("/profile"); 
        }, 1500);
      } else {
        setRegistrationErrorMsg("Error registering user");
      }
    } catch (error) {
      setRegistrationErrorMsg("Error registering user");
    }
  };

  return (
    <div className="body-register">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Tattoo Studio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={(e) => { e.preventDefault(); registerHandler(); }}>
          <CustomInput
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={firstName}
            handler={inputHandler}
          />
          <CustomInput
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            handler={inputHandler}
          />
          <CustomInput
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            handler={inputHandler}
          />
          <button className="register-btn" type="submit">
            Submit
          </button>
        </form>
        <p className="error-message">{registrationErrorMsg}</p>
        <p>{msg}</p>
      </div>
    </div>
  );
}
