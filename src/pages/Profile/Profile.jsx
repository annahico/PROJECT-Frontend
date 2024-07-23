import { useState } from "react";
import { useSelector } from "react-redux";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { userData } from "../userSlice";
import "./Profile.css";

export const Profile = () => {
  const datosRdxUser = useSelector(userData);

  const [profile, setProfile] = useState({
    name: datosRdxUser.credentials.name || "",
    surname: datosRdxUser.credentials.surname || "",
    email: datosRdxUser.credentials.email || "",
  });

  const [profileError, setProfileError] = useState({
    nameError: '',
    surnameError: '',
    emailError: '',
  });

  const [isEnabled, setIsEnabled] = useState(true);

  const errorCheck = (e) => {
    const { name, value } = e.target;
    const error = validator(name, value);

    setProfileError((prevState) => ({
      ...prevState,
      [`${name}Error`]: error,
    }));
  }

  const functionHandler = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="profileDesign">
      <div className="containerProfile">
        <div>
          NAME:
          <CustomInput
            disabled={isEnabled}
            design={`inputDesign ${
              profileError.nameError ? "inputDesignError" : ""
            }`}
            type="text"
            name="name"
            placeholder=""
            value={profile.name}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
        </div>
        <div>
          SURNAME:
          <CustomInput
            disabled={isEnabled}
            design={`inputDesign ${
              profileError.surnameError ? "inputDesignError" : ""
            }`}
            type="text"
            name="surname"
            placeholder=""
            value={profile.surname}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
        </div>
        <div>
          EMAIL:
          <CustomInput
            disabled={isEnabled}
            design={`inputDesign ${
              profileError.emailError ? "inputDesignError" : ""
            }`}
            type="email"
            name="email"
            placeholder=""
            value={profile.email}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
        </div>
        <a href="mydates">
          <div className="editDesign">MY DATES</div>
        </a>
      </div>
    </div>
  );
};
