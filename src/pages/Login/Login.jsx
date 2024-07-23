import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { login } from "../userSlice";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [msgError, setMsgError] = useState('');

  const functionHandler = (e) => {
    const { name, value } = e.target;
    setCredenciales((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const errorCheck = () => {
    // Implement validation logic if needed
    // Return an error message if validation fails
    // Example:
    if (!credenciales.email || !credenciales.password) {
      return "Email and password are required.";
    }
    return "";
  };

  const logMe = async () => {
    const errorMessage = errorCheck();
    if (errorMessage) {
      setMsgError(errorMessage);
      return;
    }

    try {
      const resultado = await logUser(credenciales);
      dispatch(login({ credentials: resultado.data }));
      console.log(resultado.data.token);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error);
      setMsgError(error.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="loginDesign">
      <div className="containerLogin">
        <div className='field'>EMAIL</div>
        <CustomInput
          design={"inputDesign"}
          type={"email"}
          name={"email"}
          placeholder={"Enter your email"}
          value={credenciales.email}
          functionProp={functionHandler}
          // Implement onBlur if needed
        />
        <div className='field'>PASSWORD</div>
        <CustomInput
          design={"inputDesign"}
          type={"password"}
          name={"password"}
          placeholder={"Enter your password"}
          value={credenciales.password}
          functionProp={functionHandler}
          // Implement onBlur if needed
        />
        {msgError && <div className="error">{msgError}</div>}
        <div className="buttonsLogin">
          <a href="loginworker"><div className='buttonSubmit'>WORKERS</div></a>
          <div className='buttonSubmit' onClick={logMe}>LOG IN</div>
        </div>
      </div>
    </div>
  );
};
