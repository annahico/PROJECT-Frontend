import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { createNewPaymentData } from "../../services/apiCalls";
import { changePaymentData } from "../paymentSlice";
import { userDataCheck } from "../userSlice";
import "./PaymentAdd.css";

export const PaymentAdd = () => {
  const reduxUserData = useSelector(userDataCheck);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerPaymentBody, setRegisterPaymentBody] = useState({
    cardNumber: "",
    validThru: "",
    user_id: reduxUserData.credentials?.userData?.userId,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (reduxUserData.credentials?.userData?.roleId !== 2) {
      navigate("/");
    }
  }, [reduxUserData, navigate]);

  const inputHandler = (e) => {
    setRegisterPaymentBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    // Simple validation
    const { cardNumber, validThru } = registerPaymentBody;
    if (!cardNumber || !validThru) {
      setError("Please fill in all fields.");
      return false;
    }
    if (cardNumber.length < 16) {
      setError("Card number must be at least 16 digits.");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(validThru)) {
      setError("Valid Thru must be in MM/YY format.");
      return false;
    }
    setError("");
    return true;
  };

  const registerPaymentData = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const result = await createNewPaymentData(registerPaymentBody, reduxUserData.credentials);
      dispatch(changePaymentData({ paymentDataData: result.data }));
      navigate("/");
    } catch (error) {
      console.error("Failed to register payment data:", error);
      setError("Failed to register payment data. Please try again.");
    } finally {
      setLoading(false);
    }
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
              type="text"
              placeholder="Enter your card number"
              value={registerPaymentBody.cardNumber}
              name="cardNumber"
              className="defaultInput"
              manejadora={inputHandler}
              maxLength={16}
            />
          </div>
          <div className="row inputRow">
            <div className="scripting">Valid Thru</div>
            <Input
              type="text"
              placeholder="Enter your card's valid thru date (MM/YY)"
              value={registerPaymentBody.validThru}
              name="validThru"
              className="defaultInput"
              manejadora={inputHandler}
              maxLength={5}
            />
          </div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row downRowRegister">
        <div className="buttonBody" onClick={registerPaymentData} disabled={loading}>
          {loading ? "Processing..." : "Register Payment Data"}
        </div>
      </div>
    </div>
  );
};
