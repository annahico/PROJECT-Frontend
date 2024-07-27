import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { loadPaymentData, paymentDataCheck } from "../../pages/paymentSlice";
import { modifyUser, searchCustomerPayment } from "../../services/apiCalls";
import { changeUser, userDataCheck } from "../userSlice";
import "./Profile.css";

export const Profile = () => {
  const reduxUserData = useSelector(userDataCheck);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modifyUserBody, setModifyUserBody] = useState({
    id: reduxUserData?.credentials?.userData?.userId,
    name: reduxUserData.credentials?.userData?.userName || "",
    surnames: reduxUserData.credentials?.userData?.userSurnames || "",
    email: reduxUserData.credentials?.userData?.userEmail || "",
    phone: reduxUserData.credentials?.userData?.userPhone || "",
    password: "",
    password_repeat: "",
    role_id: reduxUserData?.credentials?.userData?.roleId,
  });

  const [modifyUserBodyError, setModifyUserBodyError] = useState({
    nameError: "",
    surnamesError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    password_repeatError: "",
  });

  const tokenPayment = reduxUserData.credentials.token;
  const customerId = reduxUserData?.credentials?.userData?.userId;

  const reduxPaymentData = useSelector(paymentDataCheck);

  useEffect(() => {
    if (![1, 2, 3].includes(reduxUserData.credentials?.userData?.roleId)) {
      navigate("/");
    }
  }, [reduxUserData, navigate]);

  useEffect(() => {
    if (customerId) {
      searchCustomerPayment(customerId, tokenPayment)
        .then((results) => {
          dispatch(loadPaymentData({ paymentDataData: results }));
        })
        .catch((error) => console.error("Error fetching payment data:", error));
    }
  }, [customerId, tokenPayment, dispatch]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setModifyUserBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const modifyMe = () => {
    const { password, password_repeat, ...rest } = modifyUserBody;

    if (password !== password_repeat) {
      setModifyUserBodyError((prevState) => ({
        ...prevState,
        password_repeatError: "Passwords do not match",
      }));
      return;
    }

    const hasEmptyField = Object.values(rest).some((value) => value.trim() === "");
    if (hasEmptyField) {
      console.log("Please fill all fields");
      return;
    }

    modifyUser(modifyUserBody, reduxUserData.credentials)
      .then((result) => {
        const newUserData = {
          token: reduxUserData?.credentials?.token,
          userData: result.data.data,
        };
        dispatch(changeUser({ credentials: newUserData }));
        navigate("/");
      })
      .catch((error) => console.error("Error modifying user:", error));
  };

  return (
    <div className="container-fluid profile">
      <div className="row spaceUp" />
      <div className="row">
        <div className="col" />
        <div className="col">
          <div className="row title">Modify your user data</div>
        </div>
        <div className="col" />
      </div>
      <div className="row upRowRegister">
        <div className="col-1" />
        <div className="col-5">
          {reduxUserData?.credentials?.userData?.roleId !== 3 && (
            <div className="row inputRow">
              <div className="scripting">Name</div>
              <Input
                type="text"
                placeholder=""
                value={modifyUserBody.name}
                name="name"
                className="defaultInput"
                manejadora={inputHandler}
              />
              {modifyUserBodyError.nameError}
            </div>
          )}
          <div className="row inputRow">
            <div className="scripting">E-mail</div>
            <Input
              type="email"
              placeholder=""
              value={modifyUserBody.email}
              name="email"
              className="defaultInput"
              manejadora={inputHandler}
            />
            {modifyUserBodyError.emailError}
          </div>
          <div className="row inputRow">
            <div className="scripting">Phone</div>
            <Input
              type="number"
              placeholder=""
              value={modifyUserBody.phone}
              name="phone"
              className="defaultInput"
              manejadora={inputHandler}
            />
            {modifyUserBodyError.phoneError}
          </div>
        </div>
        <div className="col-5">
          {reduxUserData?.credentials?.userData?.roleId !== 3 && (
            <div className="row inputRow">
              <div className="scripting">Surnames</div>
              <Input
                type="text"
                placeholder=""
                value={modifyUserBody.surnames}
                name="surnames"
                className="defaultInput"
                manejadora={inputHandler}
              />
              {modifyUserBodyError.surnamesError}
            </div>
          )}
          <div className="row inputRow">
            <div className="scripting">Password</div>
            <Input
              type="password"
              placeholder="Enter your new password"
              value={modifyUserBody.password}
              name="password"
              className="defaultInput"
              manejadora={inputHandler}
            />
            {modifyUserBodyError.passwordError}
          </div>
          <div className="row inputRow">
            <div className="scripting">Repeat Password</div>
            <Input
              type="password"
              placeholder="Repeat your new password"
              value={modifyUserBody.password_repeat}
              name="password_repeat"
              className="defaultInput"
              manejadora={inputHandler}
            />
            {modifyUserBodyError.password_repeatError}
          </div>
        </div>
        <div className="col-1" />
      </div>
      <div className="row downRowRegister">
        <div className="buttonBody" onClick={modifyMe}>
          Modify user data
        </div>
      </div>
      {reduxPaymentData.paymentDataData?.data?.data == null ? (
        reduxUserData?.credentials?.userData?.roleId === 2 && (
          <div className="row downRowPayment">
            <div className="buttonBody" onClick={() => navigate("/paymentadd")}>
              Add payment data
            </div>
          </div>
        )
      ) : (
        reduxUserData?.credentials?.userData?.roleId === 2 && (
          <div className="row downRowPayment">
            <div className="buttonBody" onClick={() => navigate("/paymentmodify")}>
              Modify payment data
            </div>
          </div>
        )
      )}
      <div className="row downRowRegister" />
    </div>
  );
};
