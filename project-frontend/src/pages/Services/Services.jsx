import { useEffect, useState } from "react";
import { ServicesCard } from "../../components/ServicesCard/ServicesCard";
import { GetServices } from "../../services/apiCalls";
import "./Services.css";

export const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const fetched = await GetServices();
                setServices(fetched.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        if (services.length === 0) {
            fetchServices();
        }
    }, [services]);

    return (
        <div className="servicesDesign">
            <div>Services View</div>
            {services.length > 0 ? (
                <div className="servicesList">
                    {services.map((service, index) => (
                        <ServicesCard
                            key={index}
                            serviceName={service.service_name}
                            description={service.description}
                        />
                    ))}
                </div>
            ) : (
                <p>Services are coming</p>
            )}
        </div>
    );
};
