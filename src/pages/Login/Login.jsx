import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Header } from "../../common/Header/Header";
import { useAuth } from "../../context/AuthContext";
import { LoginUser } from "../../services/apiCalls";
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
            console.log("Fetched response:", fetched); // Depuración

            if (fetched && fetched.success && fetched.token) {
                // Si la API no devuelve un usuario, pero sólo el token, podrías necesitar hacer otra llamada para obtener el usuario
                const user = {}; // Supón que obtienes el usuario aquí de alguna manera, o desde otra llamada a la API
                login(fetched.token, user); // Actualiza según sea necesario

                setMsgError(`Login successful`);

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                console.error("Fetched data structure is incorrect:", fetched);
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

