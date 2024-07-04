import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { GetProfile, UpdateProfile } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import "./Profile.css";

export const Profile = () => {
  const datosUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();

  const [write, setWrite] = useState("disabled");
  const [tokenStorage, setTokenStorage] = useState(datosUser?.token);
  const [loadedData, setLoadedData] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [userError, setUserError] = useState({
    first_nameError: "",
    last_nameError: "",
    emailError: "",
  });

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage, navigate]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const fetched = await GetProfile(tokenStorage);
        setUser({
          first_name: fetched.data.first_name,
          last_name: fetched.data.last_name,
          email: fetched.data.email,
        });
        setLoadedData(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (!loadedData) {
      getUserProfile();
    }
  }, [tokenStorage, loadedData]);

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
      [`${e.target.name}Error`]: error,
    }));
  };

  const updateData = async () => {
    try {
      const fetched = await UpdateProfile(tokenStorage, user);
      setUser({
        first_name: fetched.data.first_name,
        last_name: fetched.data.last_name,
        email: fetched.data.email,
      });
      setWrite("disabled");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profileDesign">
      {!loadedData ? (
        <div>CARGANDO</div>
      ) : (
        <>
          <ProfileCard
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
          />
          <CustomInput
            className={`inputDesign ${userError.first_nameError ? "inputDesignError" : ""}`}
            type="text"
            placeholder=""
            name="first_name"
            disabled={write}
            value={user.first_name}
            onChangeFunction={inputHandler}
            onBlurFunction={checkError}
          />
          <div className="error">{userError.first_nameError}</div>
          <CustomInput
            className={`inputDesign ${userError.last_nameError ? "inputDesignError" : ""}`}
            type="text"
            placeholder=""
            name="last_name"
            disabled={write}
            value={user.last_name}
            onChangeFunction={inputHandler}
            onBlurFunction={checkError}
          />
          <div className="error">{userError.last_nameError}</div>
          <CustomInput
            className={`inputDesign ${userError.emailError ? "inputDesignError" : ""}`}
            type="email"
            placeholder=""
            name="email"
            disabled={true}
            value={user.email}
            onChangeFunction={inputHandler}
            onBlurFunction={checkError}
          />
          <div className="error">{userError.emailError}</div>
          <CustomButton
            className={`customButtonDesign ${write === "" ? "customButtonGreen" : ""}`}
            title={write === "" ? "Confirm" : "Edit"}
            functionEmit={write === "" ? updateData : () => setWrite("")}
          />
        </>
      )}
    </div>
  );
};
