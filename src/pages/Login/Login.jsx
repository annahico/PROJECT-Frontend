import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { loginUser } from "../../services/apiCalls";
import { login, userDataCheck } from "../userSlice";
import "./Login.css";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const datosReduxUser = useSelector(userDataCheck);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginMe = async () => {
    try {
      const resultado = await loginUser(credentials);
      const userCredentials = {
        token: resultado.data.token,
        userData: jwt_decode(resultado.data.token),
      };
      dispatch(login({ credentials: userCredentials }));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Opcional: Agregar lógica para mostrar un mensaje de error
    }
  };

  useEffect(() => {
    const userRole = datosReduxUser.credentials?.userData?.roleId;

    if (userRole) {
      navigate("/");
    }
  }, [datosReduxUser, navigate]);

  return (
    <div className="container-fluid login">
      <div className="row upRowLogin"></div>
      <div className="row middleRowLogin">
        <Input
          type="email"
          placeholder="Introduce your e-mail"
          value={credentials.email}
          name="email"
          manejadora={inputHandler}
        />
        <Input
          type="password"
          placeholder="Introduce your password"
          value={credentials.password}
          name="password"
          manejadora={inputHandler}
        />
      </div>
      <div className="row downRowLogin">
        <div className="col"></div>
        <div className="col buttons">
          <div className="buttonBody" onClick={loginMe}>
            Login
          </div>
          <div className="messageBox">
            If you do not have an account click on the button to register
          </div>
          <div className="buttonBody" onClick={() => navigate("/register")}>
            Register
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
