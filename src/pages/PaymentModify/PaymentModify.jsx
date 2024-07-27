import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { modifyPaymentData } from "../../services/apiCalls";
import { changePaymentData, paymentDataCheck } from "../paymentSlice";
import { userDataCheck } from "../userSlice";
import "./PaymentModify.css";

export const PaymentModify = () => {
  const reduxPaymentData = useSelector(paymentDataCheck);
  const reduxUserData = useSelector(userDataCheck);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modifyPaymentDataBody, setModifyPaymentDataBody] = useState({
    id: reduxPaymentData.paymentDataData?.data?.data?.id || "",
    cardNumber: reduxPaymentData.paymentDataData?.data?.data?.cardNumber || "",
    validThru: reduxPaymentData.paymentDataData?.data?.data?.validThru || "",
    user_id: reduxPaymentData.paymentDataData?.data?.data?.user_id || "",
  });

  const [loading, setLoading] = useState(false);
  const [modifyPaymentDataBodyError, setModifyPaymentDataBodyError] = useState({
    cardNumberError: "",
    validThruError: "",
  });

  useEffect(() => {
    if (reduxUserData.credentials?.userData?.roleId !== 2) {
      navigate("/");
    }
  }, [reduxUserData, navigate]);

  const inputHandler = (e) => {
    setModifyPaymentDataBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    const { cardNumber, validThru } = modifyPaymentDataBody;
    let isValid = true;
    let cardNumberError = "";
    let validThruError = "";

    if (!cardNumber) {
      cardNumberError = "Card number is required.";
      isValid = false;
    } else if (cardNumber.length < 16) {
      cardNumberError = "Card number must be at least 16 digits.";
      isValid = false;
    }

    if (!validThru) {
      validThruError = "Valid thru date is required.";
      isValid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(validThru)) {
      validThruError = "Valid thru must be in MM/YY format.";
      isValid = false;
    }

    setModifyPaymentDataBodyError({ cardNumberError, validThruError });
    return isValid;
  };

  const modifyThisPaymentData = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const result = await modifyPaymentData(modifyPaymentDataBody, reduxUserData.credentials.token);
      dispatch(changePaymentData({ paymentDataData: result.data }));
      navigate("/profile");
    } catch (error) {
      console.error("Failed to modify payment data:", error);
      setModifyPaymentDataBodyError({ cardNumberError: "Failed to modify payment data. Please try again.", validThruError: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid profile">
      <div className="row spaceUp" />
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="row title">Modify your payment data</div>
        </div>
        <div className="col"></div>
      </div>
      <div className="row upRowRegister">
        <div className="col-1"></div>
        <div className="col-5">
          <div className="row inputRow">
            <div className="scripting">Card number</div>
            <Input
              type="text"
              placeholder="Enter your card number"
              value={modifyPaymentDataBody.cardNumber}
              name="cardNumber"
              className="defaultInput"
              manejadora={inputHandler}
            />
            {modifyPaymentDataBodyError.cardNumberError && (
              <div className="error-message">{modifyPaymentDataBodyError.cardNumberError}</div>
            )}
          </div>
          <div className="row inputRow">
            <div className="scripting">Valid thru</div>
            <Input
              type="text"
              placeholder="Enter the valid thru date (MM/YY)"
              value={modifyPaymentDataBody.validThru}
              name="validThru"
              className="defaultInput"
              manejadora={inputHandler}
            />
            {modifyPaymentDataBodyError.validThruError && (
              <div className="error-message">{modifyPaymentDataBodyError.validThruError}</div>
            )}
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row downRowRegister">
        <div className="buttonBody" onClick={modifyThisPaymentData} disabled={loading}>
          {loading ? "Processing..." : "Modify Payment Data"}
        </div>
      </div>
      <div className="row downRowRegister"></div>
    </div>
  );
};
