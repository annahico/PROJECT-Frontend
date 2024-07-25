import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Header } from "../../common/Header/Header";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const loginMe = async () => {
        try {
            // Perform login request
            const fetched = await LoginUser(credentials);
            console.log(fetched); 

            if (fetched && fetched.user && fetched.user.firstName) {
                login(fetched.token, fetched.user);
                setMsgError(`Welcome back, ${fetched.user.firstName}`);
                
                // Navigate to home after a delay
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
                    className="inputDesign"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={credentials.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <CustomInput
                    className="inputDesign"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={credentials.password || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <CustomButton
                    className="buttonDesign"
                    title="Login"
                    functionEmit={loginMe}
                />
                <div className="error">{msgError}</div>
            </div>
        </>
    );
};
