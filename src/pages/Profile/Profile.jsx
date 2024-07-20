import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Header } from "../../common/Header/Header";
import { useAuth } from "../../context/AuthContext";
import { GetProfile, UpdateProfile } from "../../services/apiCalls";
import { validate } from "../../utils/function";
import "./Profile.css";

export const Profile = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [write, setWrite] = useState("disabled");
    const [loadedData, setLoadedData] = useState(false);
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    const [userError, setUserError] = useState({
        first_nameError: "",
        last_nameError: "",
        emailError: "",
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    useEffect(() => {
        if (!auth?.token) {
            navigate("/");
        }
    }, [auth, navigate]);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const fetched = await GetProfile(auth.token);

                setLoadedData(true);

                setUser({
                    first_name: fetched.data.firstName,
                    last_name: fetched.data.secondName,
                    email: fetched.data.email,
                });
            } catch (error) {
                return error;
            }
        };

        if (!loadedData) {
            getUserProfile();
        }
    }, [loadedData, auth.token]);

    const updateData = async () => {
        try {
            const fetched = await UpdateProfile(auth.token, user);

            setUser((prevState) => ({
                ...prevState,
                first_name: fetched.data.firstName || prevState.first_name,
                last_name: fetched.data.secondName || prevState.last_name,
                email: fetched.data.email || prevState.email,
            }));

            setWrite("disabled");
        } catch (error) {
            return error;
        }
    };

    return (
        <>
            <Header />
            <div className="profileDesign">
                {!loadedData ? (
                    <div>Loading</div>
                ) : (
                    <div className="profileDesign">
                        <div className="titleDesign">Welcome to Your Profile</div>
                        <CustomInput
                            className={`inputDesign ${userError.first_nameError !== "" ? "inputDesignError" : ""}`}
                            type={"text"}
                            placeholder={""}
                            name={"first_name"}
                            disabled={write}
                            value={user.first_name || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CustomInput
                            className={`inputDesign ${userError.last_nameError !== "" ? "inputDesignError" : ""}`}
                            type={"text"}
                            placeholder={""}
                            name={"last_name"}
                            disabled={"disabled"}
                            value={user.last_name || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CustomInput
                            className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                            type={"email"}
                            placeholder={""}
                            name={"email"}
                            disabled={"disabled"}
                            value={user.email || ""}
                            onChangeFunction={(e) => inputHandler(e)}
                            onBlurFunction={(e) => checkError(e)}
                        />
                        <CustomButton
                            className={"buttonDesign"}
                            title={write === "" ? "Confirm" : "Edit"}
                            functionEmit={write === "" ? updateData : () => setWrite("")}
                        />
                    </div>
                )}
            </div>
        </>
    );
};
