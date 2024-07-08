import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { RegisterUser } from "../../services/apiCalls";
// import { validate } from "../../utils/functions";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password_hash: "",
  });
  const [userError, setUserError] = useState({
    first_nameError: "",
    last_nameError: "",
    emailError: "",
    password_hashError: "",
  });
  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");

  // Redirige si el usuario ya está logueado
  useEffect(() => {
    if (tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage, navigate]);

  // Maneja el cambio de entrada en los campos
  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Valida los campos de entrada
  const checkError = (e) => {
    const error = validate(e.target.name, e.target.value);
    setUserError((prevState) => ({
      ...prevState,
      [`${e.target.name}Error`]: error,
    }));
  };

  // Registra al usuario
  const registerMe = async () => {
    try {

      // Verifica si todos los campos están llenos
      for (let elemento in user) {
        if (user[elemento] === "") {
          throw new Error("All fields must be filled");
        }
      }

      // Llama a la API para registrar al usuario
      const fetched = await RegisterUser(user);
      setMsgSuccess(fetched.message);
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="registerDesign">
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <CustomInput
          className={`inputDesign ${
            userError.first_nameError !== "" ? "inputDesignError" : ""
          }`}
          type="text"
          placeholder="First Name"
          name="first_name"
          value={user.first_name || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.first_nameError}</div>
        <CustomInput
          className={`inputDesign ${
            userError.last_nameError !== "" ? "inputDesignError" : ""
          }`}
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={user.last_name || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.last_nameError}</div>
        <CustomInput
          className={`inputDesign ${
            userError.emailError !== "" ? "inputDesignError" : ""
          }`}
          type="email"
          placeholder="Email"
          name="email"
          value={user.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.emailError}</div>
        <CustomInput
          className={`inputDesign ${
            userError.password_hashError !== "" ? "inputDesignError" : ""
          }`}
          type="password"
          placeholder="Password"
          name="password_hash"
          value={user.password_hash || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.password_hashError}</div>
        <CustomButton
          className="customButtonDesign"
          title="Register"
          functionEmit={registerMe}
        />
        <div className="error">{msgError}</div>
        <div className="successMessage">{msgSuccess}</div>
      </div>
    </>
  );
};

export default Register;
