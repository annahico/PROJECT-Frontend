import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { registerUser } from "../../services/apiCalls";
import { validator } from "../../services/useful";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const [userError, setUserError] = useState({
    nameError: '',
    surnameError: '',
    emailError: '',
    passwordError: ''
  });

  const functionHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    const { name, value } = e.target;
    const error = validator(name, value);

    setUserError((prevState) => ({
      ...prevState,
      [`${name}Error`]: error,
    }));
  };

  const submitHandler = () => {
    // Check if all fields are filled
    for (let key in user) {
      if (user[key] === "") {
        return;
      }
    }

    // Check if there are any errors
    for (let key in userError) {
      if (userError[key] !== "") {
        return;
      }
    }

    registerUser(user)
      .then((result) => {
        // Redirect to login page if registration is successful
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="registerDesign">
      <div className="registerContainer">
        <div className='field'>NAME</div>
        <CustomInput
          design={`inputDesign ${userError.nameError ? 'inputDesignError' : ''}`}
          type="text"
          name="name"
          placeholder=""
          value={user.name}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.nameError}</div>
        
        <div className='field'>SURNAME</div>
        <CustomInput
          design={`inputDesign ${userError.surnameError ? 'inputDesignError' : ''}`}
          type="text"
          name="surname"
          placeholder=""
          value={user.surname}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.surnameError}</div>
        
        <div className='field'>EMAIL</div>
        <CustomInput
          design={`inputDesign ${userError.emailError ? 'inputDesignError' : ''}`}
          type="email"
          name="email"
          placeholder=""
          value={user.email}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.emailError}</div>
        
        <div className='field'>PASSWORD</div>
        <CustomInput
          design={`inputDesign ${userError.passwordError ? 'inputDesignError' : ''}`}
          type="password"
          name="password"
          placeholder=""
          value={user.password}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.passwordError}</div>
        
        <div className='buttonSubmit' onClick={submitHandler}>REGISTER</div>
      </div>
    </div>
  );
};
