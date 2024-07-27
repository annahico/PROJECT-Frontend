import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { registerUser } from "../../services/apiCalls";
import { userDataCheck } from "../userSlice";
import "./Register.css";

export const Register = () => {
  const reduxUserData = useSelector(userDataCheck);
  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = reduxUserData.credentials?.userData?.roleId;
    if ([1, 2, 3].includes(userRoleId)) {
      navigate("/");
    }
  }, [reduxUserData, navigate]);

  const [formData, setFormData] = useState({
    role_id: 2,
    name: "",
    surnames: "",
    email: "",
    phone: "",
    password: "",
    password_repeat: "",
  });

  const [formErrors, setFormErrors] = useState({
    password_repeatError: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sanitizeFormData = (data) => {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, String(value)]));
  };

  const registerMe = () => {
    const sanitizedData = sanitizeFormData(formData);
    const { password, password_repeat, ...rest } = sanitizedData;

    // Check for empty fields
    const hasEmptyField = Object.values(rest).some((value) => value.trim() === "");
    if (hasEmptyField) {
      console.log("Please fill all fields");
      return;
    }

    if (password !== password_repeat) {
      setFormErrors((prevState) => ({
        ...prevState,
        password_repeatError: "Passwords do not match",
      }));
      return;
    }

    registerUser(sanitizedData)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container-fluid register">
      <div className="space"></div>
      <div className="row upRowRegister">
        <div className="col-1"></div>
        <div className="col-5">
          <div className="row inputRow">
            <div className="scripting">Name</div>
            <Input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              name="name"
              className="defaultInput"
              manejadora={inputHandler}
            />
          </div>
          <div className="row inputRow">
            <div className="scripting">Email</div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              name="email"
              className="defaultInput"
              manejadora={inputHandler}
            />
          </div>
          <div className="row inputRow">
            <div className="scripting">Phone</div>
            <Input
              type="number"
              placeholder="Enter your phone number"
              value={formData.phone}
              name="phone"
              className="defaultInput"
              manejadora={inputHandler}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="row inputRow">
            <div className="scripting">Surnames</div>
            <Input
              type="text"
              placeholder="Enter your surnames"
              value={formData.surnames}
              name="surnames"
              className="defaultInput"
              manejadora={inputHandler}
            />
          </div>
          <div className="row inputRow">
            <div className="scripting">Password</div>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              name="password"
              className="defaultInput"
              manejadora={inputHandler}
            />
          </div>
          <div className="row inputRow">
            <div className="scripting">Repeat Password</div>
            <Input
              type="password"
              placeholder="Repeat your password"
              value={formData.password_repeat}
              name="password_repeat"
              className="defaultInput"
              manejadora={inputHandler}
            />
            {formErrors.password_repeatError && (
              <div className="error">{formErrors.password_repeatError}</div>
            )}
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row downRowRegister">
        <div className="buttonBody" onClick={registerMe}>
          Register
        </div>
      </div>
    </div>
  );
};
