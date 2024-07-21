import React, { useState, useEffect } from "react";
import "./Register.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';

export const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  })

  const [userError, setUserError] = useState({
    nameError: '',
    surnameError: '',
    emailError: '',
    passwordError: ''
  })


  const functionHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {

    let error = "";

    error = validator(e.target.name, e.target.value);

    setUserError((prevState) => ({
        ...prevState,
        [e.target.name + 'Error']: error,
    }));
  }

  const Submit = () => {

    for(let test1 in user){
      if(user[test1] === ""){

        return;
      }

    }

    for(let test in userError){
      if(userError[test] !== ""){
        return;
      }
    }

    registerUser(user)
      .then(
        resultado => {
          //si todo ha ido bien, redirigiremos a login...

          setTimeout(()=>{
            navigate("/login");
          },500)
        }
      )
      .catch(error=> console.log(error));
  }

  return (
    <div className="registerDesign">
      <div className="registerContainer">
      <div className='field'>NAME</div>
        <CustomInput
        design={`inputDesign ${userError.nameError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"name"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.nameError}</div>
      <div className='field'>SURNAME</div>
      <CustomInput
        design={`inputDesign ${userError.surnameError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"surname"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.surnameError}</div>
      <div className='field'>EMAIL</div>
      <CustomInput
        design={`inputDesign ${userError.emailError !== "" ? 'inputDesignError' : ''}`}
        type={"email"}
        name={"email"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.emailError}</div>
      <div className='field'>PASSWORD</div>
      <CustomInput
        design={`inputDesign ${userError.passwordError !== "" ? 'inputDesignError' : ''}`}
        type={"password"}
        name={"password"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.passwordError}</div>
      <div className='buttonSubmit' onClick={Submit}>REGISTER</div>
      </div>
    </div>
  );
};