import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { createNewPaymentData } from "../../services/apiCalls";
import { changePaymentData, paymentDataCheck } from "../paymentSlice";
import { userDataCheck } from "../userSlice";
import "./PaymentAdd.css";

export const PaymentAdd = () => {
  const reduxUserData = useSelector(userDataCheck);
  const reduxPaymentData = useSelector(paymentDataCheck);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (reduxUserData.credentials?.userData?.roleId !== 2) {
      navigate("/");
    }
  }, [reduxUserData, navigate]);

  const [registerPaymentBody, setRegisterPaymentBody] = useState({
    cardNumber: "",
    validThru: "",
    user_id: reduxUserData.credentials?.userData?.userId,
  });

  const inputHandler = (e) => {
    setRegisterPaymentBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerPaymentData = () => {
    createNewPaymentData(registerPaymentBody, reduxUserData.credentials)
      .then((result) => {
        dispatch(changePaymentData({ paymentDataData: result.data }));
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
            <div className="scripting">Card Number</div>
            <Input
              type={"text"}
              placeholder="Enter your card number"
              value={registerPaymentBody.cardNumber}
              name={"cardNumber"}
              className="defaultInput"
              manejadora={inputHandler}
            />
          </div>
          <div className="row inputRow">
            <div className="scripting">Valid Thru</div>
            <Input
              type={"text"}
              placeholder="Enter your card's valid thru date"
              value={registerPaymentBody.validThru}
              name={"validThru"}
              className="defaultInput"
              manejadora={inputHandler}
            />
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row downRowRegister">
        <div className="buttonBody" onClick={registerPaymentData}>
          Register Payment Data
        </div>
      </div>
    </div>
  );
};
