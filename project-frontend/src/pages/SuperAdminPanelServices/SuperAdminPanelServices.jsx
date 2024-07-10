import { useCallback, useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ServicesCard } from "../../components/ServicesCard/ServicesCard";
import { DeleteServiceById, GetServices, PostService } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import "./SuperAdminPanelServices.css";

export const SuperAdminPanelServices = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));

    const [serviceError, setServiceError] = useState({
        service_nameError: "",
        descriptionError: "",
    });
    const [msgError, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [write, setWrite] = useState("disabled");
    const [tokenStorage] = useState(datosUser?.token);

    const [services, setServices] = useState([]);
    const [servicesCredentials, setServicesCredentials] = useState({
        service_name: "",
        description: "",
    });

    const inputHandler = (e) => {
        setServicesCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value);
        setServiceError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    const bringData = useCallback(async () => {
        try {
            const fetched = await GetServices();
            setServices(fetched.data);
        } catch (error) {
            setMsgError(error.message);
        }
    }, []);

    const createService = async () => {
        try {
            for (let elemento in servicesCredentials) {
                if (servicesCredentials[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }
            setLoading(true);
            const fetched = await PostService(servicesCredentials, tokenStorage);
            if (!fetched.success) {
                setLoading(false);
                return setMsgError(fetched.message);
            }
            setMsgSuccess(fetched.message);
            setLoading(false);
            setTimeout(() => {
                bringData();
            }, 1000);
        } catch (error) {
            setMsgError(error.message);
        }
    };

    useEffect(() => {
        if (services.length === 0) {
            bringData();
        }
    }, [services, bringData]);

    const updateData = (serviceId) => {
        console.log(serviceId);
        setWrite("disabled");
    };

    const deleteService = async (serviceId) => {
        try {
            const fetched = await DeleteServiceById(serviceId, tokenStorage);
            if (!fetched.success) {
                setMsgError(fetched.message);
            } else {
                setMsgSuccess(fetched.message);
                setTimeout(() => {
                    bringData();
                }, 2000);
            }
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="superadminpanelservicesDesign">
                {services.length > 0 ? (
                    <div className="superadminpanelservicesDesign">
                        {services.map((service) => (
                            <div key={service.id}>
                                <ServicesCard
                                    service_name={service.service_name}
                                    description={service.description}
                                />
                                <CustomButton
                                    className={"customButtonDesign"}
                                    title={"Borrar"}
                                    functionEmit={() => deleteService(service.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="superadminpanelservicesDesign">
                        <p>Los servicios están viniendo</p>
                    </div>
                )}
                <CustomInput
                    className={`inputDesign ${serviceError.service_nameError !== "" ? "inputDesignError" : ""}`}
                    type={"text"}
                    placeholder={"service_name"}
                    name={"service_name"}
                    value={servicesCredentials.service_name || ""}
                    onChangeFunction={inputHandler}
                    onBlurFunction={checkError}
                />
                <div className="error">{serviceError.service_nameError}</div>
                <CustomInput
                    className={`inputDesign ${serviceError.descriptionError !== "" ? "inputDesignError" : ""}`}
                    type={"text"}
                    placeholder={"description"}
                    name={"description"}
                    value={servicesCredentials.description || ""}
                    onChangeFunction={inputHandler}
                    onBlurFunction={checkError}
                />
                <div className="error">{serviceError.descriptionError}</div>
                <CustomButton
                    className={"customButtonDesign"}
                    title={"Crear cita"}
                    functionEmit={createService}
                />
                <div className="error">{msgError}</div>
                <div className="success">{msgSuccess}</div>
                {loading && <span>Loading...</span>}
            </div>
        </>
    );
};
