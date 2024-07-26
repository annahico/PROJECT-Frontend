import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { loadPaymentData, paymentDataCheck } from "../../pages/paymentSlice";
import { modifyUser, searchCustomerPayment } from "../../services/apiCalls";
import { changeUser, userDataCheck } from "../userSlice";
import "./Profile.css";

export const Profile = () => {
  // Instantiate REDUX in read mode
  const reduxUserData = useSelector(userDataCheck);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      reduxUserData.credentials?.userData?.roleId !== 1 &&
      reduxUserData.credentials?.userData?.roleId !== 2 &&
      reduxUserData.credentials?.userData?.roleId !== 3
    ) {
      navigate("/");
    }
  }, []);

  const [modifyUserBody, setModifyUserBody] = useState({
    id: reduxUserData?.credentials?.userData?.userId,
    name: reduxUserData.credentials?.userData?.userName,
    surnames: reduxUserData.credentials?.userData?.userSurnames,
    email: reduxUserData.credentials?.userData?.userEmail,
    phone: reduxUserData.credentials?.userData?.userPhone,
    password: "",
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

  const [password2, setPassword2] = useState({
    password_repeat: "",
  });

  // Code to fetch payment data
  const [customerId, setCustomerId] = useState(
    reduxUserData?.credentials?.userData?.userId
  );

  useEffect(() => {
    setCustomerId(reduxUserData?.credentials?.userData?.userId);
  }, [reduxUserData]);

  const searchPaymentData = (paymentData) => {
    dispatch(loadPaymentData({ paymentDataData: paymentData }));
  };

  const tokenPayment = reduxUserData.credentials.token;

  useEffect(() => {
    searchCustomerPayment(customerId, tokenPayment).then((results) => {
      searchPaymentData(results);
    });
  }, [customerId]);

  const reduxPaymentData = useSelector(paymentDataCheck);

  // BIND
  const inputHandler = (e) => {
    setModifyUserBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setPassword2((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const modifyMe = () => {
    if (modifyUserBody.password === password2.password_repeat) {
      for (let check in modifyUserBody) {
        if (modifyUserBody[check] === "") {
          return;
        }
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
        .catch((error) => console.log(error));
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="container-fluid profile">
      <div className="row spaceUp" />
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="row title">Modify your user data</div>
        </div>
        <div className="col"></div>
      </div>
      <div className="row upRowRegister">
        <div className="col-1"></div>
        <div className="col-5">
          {reduxUserData?.credentials?.userData?.roleId !== 3 && (
            <div className="row inputRow">
              <div className="scripting">Name</div>
              <Input
                type={"text"}
                placeholder=""
                value={modifyUserBody.name}
                name={"name"}
                className="defaultInput"
                manejadora={inputHandler}
              />
              {modifyUserBodyError.nameError}
            </div>
          )}
          <div className="row inputRow">
            <div className="scripting">e-mail</div>
            <Input
              type={"email"}
              placeholder=""
              value={modifyUserBody.email}
              name={"email"}
              className="defaultInput"
              manejadora={inputHandler}
            />
            {modifyUserBodyError.emailError}
          </div>
          <div className="row inputRow">
            <div className="scripting">Phone</div>
            <Input
              type={"number"}
              placeholder=""
              value={modifyUserBody.phone}
              name={"phone"}
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
                type={"text"}
                placeholder=""
                value={modifyUserBody.surnames}
                name={"surnames"}
                className="defaultInput"
                manejadora={inputHandler}
              />
              {modifyUserBodyError.surnamesError}
            </div>
          )}
          <div className="row inputRow">
            <div className="scripting">Password</div>
            <Input
              type={"password"}
              placeholder="Enter your new password"
              value={modifyUserBody.password}
              name={"password"}
              className="defaultInput"
              manejadora={inputHandler}
            />
            {modifyUserBodyError.passwordError}
          </div>
          <div className="row inputRow">
            <div className="scripting">Password</div>
            <Input
              type={"password"}
              placeholder="Repeat your new password"
              value={modifyUserBody.password_repeat}
              name={"password_repeat"}
              className="defaultInput"
              manejadora={inputHandler}
            />
            {modifyUserBodyError.password_repeatError}
          </div>
          <div className="row inputRow"></div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row downRowRegister">
        <div className="buttonBody" onClick={() => modifyMe()}>
          Modify user data
        </div>
      </div>
      {reduxPaymentData.paymentDataData?.data?.data == null ? (
        <>
          {reduxUserData?.credentials?.userData?.roleId === 2 && (
            <div className="row downRowPayment">
              <div
                className="buttonBody"
                onClick={() => navigate("/paymentadd")}
              >
                Add payment data
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {reduxUserData.credentials?.userData?.roleId === 2 && (
            <div className="row downRowPayment">
              <div
                className="buttonBody"
                onClick={() => navigate("/paymentmodify")}
              >
                Modify payment data
              </div>
            </div>
          )}
        </>
      )}

      <div className="row downRowRegister"></div>
    </div>
  );
};
