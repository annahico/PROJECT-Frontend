import React, { useState, useEffect } from "react";
import "./WorkerLogin.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { logWorker } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../userSlice";

export const LoginWorker = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [msgError, setMsgError] = useState('');

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const errorCheck = () => {
    console.log("ha ha ha ha");
  }

  const logMe = () => {

    logWorker(credenciales)
        .then(
            resultado => {
                console.log(resultado)
                dispatch(login({ credentials: resultado.data }))

                setTimeout(()=>{
                    navigate("/");
                },500);
            }
        )
        .catch(error => {
          console.log(error)
          setMsgError(error.message);
        });

  }

  return (
    <div className="loginDesign">
      <div className="containerLogin">
      <div className='field'>EMAIL</div>
      <CustomInput
        design={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        // onBlur={}
      />
      <div className='field'>PASSWORD</div>
      <CustomInput
        design={"inputDesign"}
        type={"password"}
        name={"password"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        // onBlur={}
      />
      <div className="buttonsLogin">
      <a href="login"><div className='buttonSubmit'>CUSTOMERS</div></a>
       <div className='buttonSubmit' onClick={logMe}>LOG IN</div>
      </div>
      </div>
    </div>
  );
};