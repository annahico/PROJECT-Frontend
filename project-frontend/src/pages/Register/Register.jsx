import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/Custominput/Custominput";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../common/customButton/customButton";
import { RegisterUser } from "../../services/apiCalls";
import { validate } from "../../utils/functions";
import "./Register.css";

export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const error = validate(fieldName, fieldValue);

        setUserError((prevState) => ({
            ...prevState,
            [`${fieldName}Error`]: error,
        }));
    };

    const registerMe = async () => {
        try {
            for (let element in user) {
                if (user[element] === "") {
                    throw new Error("All fields must be filled");
                }
            }

            const fetched = await RegisterUser(user);
            setMsgError(fetched.message);
            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="registerDesign">
                <div className="titleDesign">Register</div>
                <CustomInput
                    className={`inputDesign ${userError.firstNameError ? "inputDesignError" : ""}`}
                    type={"text"}
                    placeholder={"First Name"}
                    name={"firstName"}
                    value={user.firstName || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.firstNameError}</div>

                <CustomInput
                    className={`inputDesign ${userError.lastNameError ? "inputDesignError" : ""}`}
                    type={"text"}
                    placeholder={"Last Name"}
                    name={"lastName"}
                    value={user.lastName || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.lastNameError}</div>

                <CustomInput
                    className={`inputDesign ${userError.emailError ? "inputDesignError" : ""}`}
                    type={"email"}
                    placeholder={"Email"}
                    name={"email"}
                    value={user.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.emailError}</div>

                <CustomInput
                    className={`inputDesign ${userError.passwordError ? "inputDesignError" : ""}`}
                    type={"password"}
                    placeholder={"Password"}
                    name={"password"}
                    value={user.password || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.passwordError}</div>

                <CustomButton
                    className={"buttonDesign"}
                    title={"Register"}
                    functionEmit={registerMe}
                />
                <div className="error">{msgError}</div>
            </div>
        </>
    );
};
