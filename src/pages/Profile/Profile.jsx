import React, { useState, useEffect } from "react";
import "./Profile.css";

import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";


import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Profile = () => {
  const datosRdxUser = useSelector(userData);

  const [profile, setProfile] = useState({
    name: datosRdxUser.credentials.name,
    surname: datosRdxUser.credentials.surname,
    email: datosRdxUser.credentials.email,
  });

  const [profileError, setProfileError] = useState({
    nameError: '',
    surnameError: '',
    emailError: '',
    passwordError: '',
  });

  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {

  }, [datosRdxUser]);

  const errorCheck = (e) => {

    let error = "";

    error = validator(e.target.name, e.target.value);

    setProfileError((prevState) => ({
        ...prevState,
        [e.target.name + 'Error']: error,
    }));
  }

  const functionHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="profileDesign">
      <div className="containerProfile">
        NAME:
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.firstNameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"name"}
        placeholder={""}
        value={profile.name}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      SURNAME:
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.lastNameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"surname"}
        placeholder={""}
        value={profile.surname}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      EMAIL:
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.emailError !== "" ? "inputDesignError" : ""
        }`}
        type={"email"}
        name={"email"}
        placeholder={""}
        value={profile.email}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
        <a href="mydates"><div className="editDesign">MY DATES</div></a>
      </div>
    </div>
  );
};