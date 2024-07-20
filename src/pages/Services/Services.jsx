import { useEffect, useState } from "react";
import { Card } from "../../common/Card/Card";
import { Header } from "../../common/Header/Header";
import { useAuth } from "../../context/AuthContext";
import { GetServices } from "../../services/apiCalls";
import "./Services.css";

export const Services = () => {
    const [services, setServices] = useState([]);
    const { isLoggedIn } = useAuth(); // Usa el contexto para obtener el estado de autenticación

    useEffect(() => {
        if (services.length === 0 && isLoggedIn) { // Verifica si el usuario está autenticado
            const bringData = async () => {
                try {
                    const fetched = await GetServices();
                    setServices(fetched);
                } catch (error) {
                    console.error(error); // Manejo del error
                }
            };

            bringData();
        }
    }, [services, isLoggedIn]); // Dependencia adicional para el estado de autenticación

    const clickedService = (service) => {
        // Realiza alguna acción con el servicio
        console.log(service); // Ejemplo de acción
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
                        {services.map((service) => (
                            <Card
                                key={service.id}
                                name={<span className="serviceName">{service.name}</span>}
                                description={<span className="serviceDescription">{service.description}</span>}
                                clickFunction={() => clickedService(service)}
                            />
                        ))}
                    </div>
                ) : (
                    <div>No services available</div> // Mensaje en caso de que no haya servicios
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
