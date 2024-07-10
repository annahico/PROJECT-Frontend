import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import "./Register.css";

const datosUser = JSON.parse(localStorage.getItem("passport"));

export const Register = () => {
  const navigate = useNavigate();
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage, navigate]);

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);
    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const registerMe = async () => {
    try {
      for (let field in user) {
        if (user[field] === "") {
          throw new Error("All fields must be filled");
        }
      }

      setLoading(true);
      const fetched = await RegisterUser(user);

      setMsgSuccess(fetched.message);

      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2400);
    } catch (error) {
      setMsgError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="registerDesign">
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <CustomInput
          className={`inputDesign ${userError.first_nameError ? "inputDesignError" : ""}`}
          type="text"
          placeholder="First Name"
          name="first_name"
          value={user.first_name}
          onChangeFunction={inputHandler}
          onBlurFunction={checkError}
        />
        <div className="error">{userError.first_nameError}</div>
        <CustomInput
          className={`inputDesign ${userError.last_nameError ? "inputDesignError" : ""}`}
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={user.last_name}
          onChangeFunction={inputHandler}
          onBlurFunction={checkError}
        />
        <div className="error">{userError.last_nameError}</div>
        <CustomInput
          className={`inputDesign ${userError.emailError ? "inputDesignError" : ""}`}
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChangeFunction={inputHandler}
          onBlurFunction={checkError}
        />
        <div className="error">{userError.emailError}</div>
        <CustomInput
          className={`inputDesign ${userError.password_hashError ? "inputDesignError" : ""}`}
          type="password"
          placeholder="Password"
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
        {loading && <span>Loading...</span>}
      </div>
    </>
  );
};
