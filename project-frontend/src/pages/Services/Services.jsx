import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import { ServicesCard } from "../../components/ServicesCard/ServicesCard";
import { GetServices } from "../../services/apiCalls";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetched = await GetServices();
        setServices(fetched.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (services.length === 0) {
      fetchServices();
    }
  }, [services]);

  return (
    <>
      <Header />
      <div className="servicesDesign">
        {services.length > 0 ? (
          <div className="servicesList">
            {services.map((service, index) => (
              <ServicesCard
                key={index}
                service_name={service.service_name}
                description={service.description}
              />
            ))}
          </div>
        ) : (
          <div className="servicesLoading">
            <p>Services are loading...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Services;
