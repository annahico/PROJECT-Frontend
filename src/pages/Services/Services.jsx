import { useEffect, useRef, useState } from "react";
import { Cards } from "../../common/Card/Card";
import { Header } from "../../common/Layout/Header/Header";
import { apiServices } from "../../services";
import "./Services.css";

export const Services = () => {
    const [servicesAll, setServicesAll] = useState([]);
    const loadServicesExecuted = useRef(false);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const resp = await apiServices.getServices();
                setServicesAll(resp.data);
            } catch (error) {
                messageBasic("error", "Error loading services: " + error);
            }
        };

        if (!loadServicesExecuted.current) {
            loadServices();
            loadServicesExecuted.current = true;
        }
    }, []);

    return (
        <>
            <Header />
            <div className="servicesDesign">
                <div className="titleDesign">Our Services</div>
                {servicesAll.length > 0 ? (
                    <div className="cardsRoster">
                        {servicesAll.map(service => (
                            <Cards
                                key={service.id}
                                name={<span className="serviceName">{service.service_name}</span>}
                                description={<span className="serviceDescription">{service.description}</span>}
                            />
                        ))}
                    </div>
                ) : (
                    <div>No services available</div>
                )}
                <div className="titleGalleryDesign">See Our Work</div>
                <div className="section">
                    <img src={tatuaje} alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src={tatuaje} alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src={tatuaje} alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src={tatuaje} alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src={tatuaje} alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src={tatuaje} alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src={tatuaje} alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src={tatuaje} alt="Tattoo Studio" className="imageGalleryDesign" />
                </div>
            </div>
        </>
    );
};
