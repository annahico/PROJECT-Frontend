import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { RegisterUser } from "../../services/apiCalls";
import { validate } from "../../utils/functions";
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
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validate(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
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
      }, 1200);
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <div className="registerDesign">
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <CustomInput
        className={`inputDesign ${userError.first_nameError && "inputDesignError"}`}
        type="text"
        placeholder="first_name"
        name="first_name"
        value={user.first_name}
        onChangeFunction={inputHandler}
        onBlurFunction={checkError}
      />
      <div className="error">{userError.first_nameError}</div>

      <CustomInput
        className={`inputDesign ${userError.last_nameError && "inputDesignError"}`}
        type="text"
        placeholder="last_name"
        name="last_name"
        value={user.last_name}
        onChangeFunction={inputHandler}
        onBlurFunction={checkError}
      />
      <div className="error">{userError.last_nameError}</div>

      <CustomInput
        className={`inputDesign ${userError.emailError && "inputDesignError"}`}
        type="email"
        placeholder="email"
        name="email"
        value={user.email}
        onChangeFunction={inputHandler}
        onBlurFunction={checkError}
      />
      <div className="error">{userError.emailError}</div>

      <CustomInput
        className={`inputDesign ${userError.password_hashError && "inputDesignError"}`}
        type="password"
        placeholder="password"
        name="password_hash"
        value={user.password_hash}
        onChangeFunction={inputHandler}
        onBlurFunction={checkError}
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
  );
};
