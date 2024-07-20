import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Header } from "../../common/Header/Header";
import { useAuth } from '../../context/AuthContext'; // Importar el contexto
import { validate } from "../../utils/function";
import "./Register.css";

export const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth(); // Obtener el método register del contexto

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
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

            const fetched = await register(user); // Usar el método register del contexto
            setMsgError(fetched.message);
            if (fetched.success) {
                setTimeout(() => {
                    navigate("/");
                }, 1200);
            }
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
                    placeholder={"First_name"}
                    name={"first_name"}
                    value={user.first_name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.firstNameError}</div>

                <CustomInput
                    className={`inputDesign ${userError.lastNameError ? "inputDesignError" : ""}`}
                    type={"text"}
                    placeholder={"Last_name"}
                    name={"last_name"}
                    value={user.last_name || ""}
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
