
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();
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

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkError = (e) => {
    const { name, value } = e.target;
    const error = validame(name, value);
    setUserError((prevState) => ({
      ...prevState,
      [`${name}Error`]: error,
    }));
  };

  const registerMe = async () => {
    try {
      for (let key in user) {
        if (user[key] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }
      const response = await RegisterUser(user);
      setMsgSuccess(response.message);
      setTimeout(() => {
        navigate("/");
        navigate("/login");
      }, 1200);
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <div className="registerDesign">
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <CustomInput
        className={`inputDesign ${userError.first_nameError ? "inputDesignError" : ""}`}
        type="text"
        placeholder="first_name"
        name="first_name"
        value={user.first_name}
        onChange={inputHandler}
        onBlur={checkError}
      />
      <div className="error">{userError.first_nameError}</div>
      <CustomInput
        className={`inputDesign ${userError.last_nameError ? "inputDesignError" : ""}`}
        type="text"
        placeholder="last_name"
        name="last_name"
        value={user.last_name}
        onChange={inputHandler}
        onBlur={checkError}
      />
      <div className="error">{userError.last_nameError}</div>
      <CustomInput
        className={`inputDesign ${userError.emailError ? "inputDesignError" : ""}`}
        type="email"
        placeholder="email"
        name="email"
        value={user.email}
        onChange={inputHandler}
        onBlur={checkError}
      />
      <div className="error">{userError.emailError}</div>
      <CustomInput
        className={`inputDesign ${userError.password_hashError ? "inputDesignError" : ""}`}
        type="password"
        placeholder="password"
        name="password_hash"
        value={user.password_hash}
        onChange={inputHandler}
        onBlur={checkError}
      />
      <div className="error">{userError.password_hashError}</div>
      <CustomButton
        className="customButtonDesign"
        title="Register"
        onClick={registerMe}
      />
      <div className="error">{msgError}</div>
      <div className="successMessage">{msgSuccess}</div>
    </div>
  );
};
