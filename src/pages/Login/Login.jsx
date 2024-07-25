import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Header } from "../../common/Layout/Header/Header";
import { useAuth } from "../../context/AuthContext";
import { LoginUser } from "../../services/index";
import { validate } from "../../utils/function";
import "./Login.css";

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [credentialsError, setCredentialsError] = useState({
        emailError: "",
        passwordError: "",
    });
    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);
        setCredentialsError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }));
    };

    const loginMe = async () => {
        try {
            for (let element in credentials) {
                if (credentials[element] === "") {
                    throw new Error("All fields must be filled out");
                }
            }
            const fetched = await LoginUser(credentials);
            console.log(fetched); 
            if (fetched && fetched.user && fetched.user.firstName) {
                login(fetched.token, fetched.user);
                setMsgError(`Welcome back, ${fetched.user.firstName}`);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                throw new Error("Invalid user data received");
            }
        } catch (error) {
            setMsgError(error.message);
            console.error("Error during login:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="loginDesign">
                <div className="titleDesign">
                    User Login
                </div>
                <CustomInput
                    className={`inputDesign ${credentialsError.emailError !== "" ? "inputDesignError" : ""}`}
                    type={"email"}
                    placeholder={"Email"}
                    name={"email"}
                    disabled={""}
                    value={credentials.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{credentialsError.emailError}</div>
                <CustomInput
                    className={`inputDesign ${credentialsError.passwordError !== "" ? "inputDesignError" : ""}`}
                    type={"password"}
                    placeholder={"Password"}
                    name="password"
                    disabled={""}
                    value={credentials.password || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{credentialsError.passwordError}</div>
                <CustomButton
                    className={"buttonDesign"}
                    title={"Login"}
                    functionEmit={loginMe}
                />
                <div className="error">{msgError}</div>
            </div>
        </>
    );
};
