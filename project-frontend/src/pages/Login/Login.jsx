import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../components/CustomButton/CustomButton.jsx";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { LoginUser } from "../../services/apiCalls";
// import { validame } from "../../utils/functions";
import "./Login.css";

const datosUser = JSON.parse(localStorage.getItem("passport"));

export const Login = () => {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({
    email: "",
    password_hash: "",
  });
  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    password_hashError: "",
  });
  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    const tokenStorage = datosUser?.token;
    if (tokenStorage) {
      navigate("/");
    }
  }, [navigate]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCredenciales((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkError = (e) => {
    const { name, value } = e.target;
    // const error = validame(name, value);
    setCredencialesError((prevState) => ({
      ...prevState,
      [`${name}Error`]: error,
    }));
  };

  const loginMe = async () => {
    try {
      for (let key in credenciales) {
        if (credenciales[key] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }
      const fetched = await LoginUser(credenciales);
      const decodificado = decodeToken(fetched.token);
      const passport = {
        token: fetched.token,
        decodificado,
      };
      localStorage.setItem("passport", JSON.stringify(passport));
      setMsgError(`Hola ${decodificado.first_name}, bienvenido de nuevo`);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="loginDesign">
        <CustomInput
          className={`inputDesign ${
            credencialesError.emailError ? "inputDesignError" : ""
          }`}
          type="email"
          placeholder="email"
          name="email"
          value={credenciales.email}
          onChange={inputHandler}
          onBlur={checkError}
        />
        <div className="error">{credencialesError.emailError}</div>
        <CustomInput
          className={`inputDesign ${
            credencialesError.password_hashError ? "inputDesignError" : ""
          }`}
          type="password"
          placeholder="password"
          name="password_hash"
          value={credenciales.password_hash}
          onChange={inputHandler}
          onBlur={checkError}
        />
        <div className="error">{credencialesError.password_hashError}</div>
        <CustomButton
          className="customButtonDesign"
          title="Login"
          functionEmit={loginMe}
        />
        <div className="error">{msgError}</div>
      </div>
    </>
  );
};
