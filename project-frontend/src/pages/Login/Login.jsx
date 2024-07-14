import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Header } from "../../common/Header/Header";
import { LoginUser } from "../../services/apiCalls";
import { validate } from "../../utils/function";
import "./Login.css";

export const Login = () => {
    const userData = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate();
    const [tokenStorage, setTokenStorage] = useState(userData?.token);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    useEffect(() => {
        if (tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage, navigate]);

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
            const decoded = decodeToken(fetched.token);

            const passport = {
                token: fetched.token,
                decoded: decoded,
            };

            localStorage.setItem("passport", JSON.stringify(passport));

            setMsgError(`Welcome back, ${decoded.firstName}`);

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            setMsgError(error.message);
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