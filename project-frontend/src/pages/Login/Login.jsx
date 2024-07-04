import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { LoginUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import "./Login.css";

const datosUser = JSON.parse(localStorage.getItem("passport"));

export const Login = () => {
  const navigate = useNavigate();
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

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
    if (tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);

  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const loginMe = async () => {
    try {
      for (let elemento in credenciales) {
        if (credenciales[elemento] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }

      const fetched = await LoginUser(credenciales);

      const decodificado = decodeToken(fetched.token);

      const passport = {
        token: fetched.token,
        decodificado: decodificado,
      };

      localStorage.setItem("passport", JSON.stringify(passport));

      setMsgError(
        `Hola ${decodificado.first_name}, bienvenido de nuevo`
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <div className="loginDesign">
      <CustomInput
        className={`inputDesign ${
          credencialesError.emailError !== "" ? "inputDesignError" : ""
        }`}
        type={"email"}
        placeholder={"email"}
        name={"email"}
        value={credenciales.email || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
      <div className="error">{credencialesError.emailError}</div>
      <CustomInput
        className={`inputDesign ${
          credencialesError.password_hashError !== "" ? "inputDesignError" : ""
        }`}
        type={"password"}
        placeholder={"password"}
        name={"password_hash"}
        value={credenciales.password_hash || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
      <div className="error">{credencialesError.password_hashError}</div>

      <CustomButton
        className={"customButtonDesign"}
        title={"Login"}
        functionEmit={loginMe}
      />
      <div className="error">{msgError}</div>
    </div>
  );
};