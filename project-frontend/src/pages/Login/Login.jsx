import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
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
  const [msgSuccess, setMsgSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage, navigate]);

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
          throw new Error("All fields must be filled");
        }
      }

      setLoading(true);
      const fetched = await LoginUser(credenciales);

      if (!fetched.success) {
        setLoading(false);
        return setMsgError(fetched.message);
      }

      const decoded = decodeToken(fetched.token);
      const passport = {
        token: fetched.token,
        decoded: decoded,
      };

      localStorage.setItem("passport", JSON.stringify(passport));

      setMsgSuccess(`Hello ${decoded.first_name}, welcome back!`);
      setLoading(false);

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      setMsgError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="loginDesign">
        <CustomInput
          className={`inputDesign ${credencialesError.emailError ? "inputDesignError" : ""}`}
          type={"email"}
          placeholder={"email"}
          name={"email"}
          value={credenciales.email}
          onChangeFunction={inputHandler}
          onBlurFunction={checkError}
        />
        <div className="error">{credencialesError.emailError}</div>
        <CustomInput
          className={`inputDesign ${credencialesError.password_hashError ? "inputDesignError" : ""}`}
          type={"password"}
          placeholder={"password"}
          name={"password_hash"}
          value={credenciales.password_hash}
          onChangeFunction={inputHandler}
          onBlurFunction={checkError}
        />
        <div className="error">{credencialesError.password_hashError}</div>
        <CustomButton
          className={"customButtonDesign"}
          title={"Login"}
          functionEmit={loginMe}
        />
        <div className="error">{msgError}</div>
        <div className="success">{msgSuccess}</div>
        {loading && <span>Loading...</span>}
      </div>
    </>
  );
};
