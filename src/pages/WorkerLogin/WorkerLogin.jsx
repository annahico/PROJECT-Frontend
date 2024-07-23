import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logWorker } from "../../services/apiCalls";
import { validator } from "../../services/useful";
import { login } from "../userSlice";
import "./WorkerLogin.css";

export const LoginWorker = () => {
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

  const errorCheck = (e) => {
    const { name, value } = e.target;
    const error = validator(name, value);
    setMsgError((prevErrors) => ({
      ...prevErrors,
      [name + 'Error']: error,
    }));
  };

  const logMe = () => {
    // Basic validation before making the API call
    if (!credenciales.email || !credenciales.password) {
      setMsgError('Please fill in all fields.');
      return;
    }

    logWorker(credenciales)
      .then((resultado) => {
        console.log(resultado);
        dispatch(login({ credentials: resultado.data }));
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        setMsgError('Login failed: ' + error.message);
      });
  };

  return (
    <div className="loginDesign">
      <div className="containerLogin">
        <div className='field'>EMAIL</div>
        <CustomInput
          design={`inputDesign ${msgError.emailError ? 'inputDesignError' : ''}`}
          type="email"
          name="email"
          placeholder=""
          value={credenciales.email}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{msgError.emailError}</div>

        <div className='field'>PASSWORD</div>
        <CustomInput
          design={`inputDesign ${msgError.passwordError ? 'inputDesignError' : ''}`}
          type="password"
          name="password"
          placeholder=""
          value={credenciales.password}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{msgError.passwordError}</div>

        <div className="buttonsLogin">
          <a href="/login">
            <div className='buttonSubmit'>CUSTOMERS</div>
          </a>
          <div className='buttonSubmit' onClick={logMe}>LOG IN</div>
        </div>
      </div>
    </div>
  );
};
