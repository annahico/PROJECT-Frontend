import { useEffect, useState } from "react";
import { Card } from "../../common/Card/Card";
import { Header } from "../../common/Header/Header";
import { GetServices } from "../../services/apiCalls";
import "./Services.css";

export const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        if (services.length === 0) {
            const bringData = async () => {
                try {
                    const fetched = await GetServices();
                    setServices(fetched);
                } catch (error) {
                    return error;
                }
            };

            bringData();
        }
    }, [services]);

    const clickedService = (service) => {
        return service;
    };

    return (
        <>
            <Header />
            <div className="servicesDesign">
                <div className="titleDesign">
                    Our Services
                </div>
                {services.length > 0 ? (
                    <div className="cardsRoster">
                        {services.map((service) => {
                            return (
                                <Card
                                    key={service.id}
                                    name={<span className="serviceName">{service.name}</span>}
                                    description={<span className="serviceDescription">{service.description}</span>}
                                    clickFunction={() => clickedService(service)}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div>Loading services...</div>
                )}
                <div className="titleGalleryDesign">
                    See Our Work
                </div>
                <div className="section">
                    <img src="../../img/tattoo1.jpg" alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src="../../img/tattoo2.jpg" alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src="../../img/tattoo6.jpg" alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src="../../img/tattoo7.jpg" alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src="../../img/tattoo8.jpg" alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src="../../img/tattoo9.jpg" alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src="../../img/tattoo10.jpg" alt="Tattoo Studio" className="imageGalleryDesign" />
                    <img src="../../img/tattoo11.jpg" alt="Tattoo Studio" className="imageGalleryDesign" />
                </div>
            </div>
        </>
    );
};
