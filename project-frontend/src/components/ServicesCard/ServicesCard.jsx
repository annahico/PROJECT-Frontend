import "./ServicesCard.css";

export const ServicesCard = ({ serviceName, description }) => {
    return (
        <div className="services-card">
            <div className="service-name">{serviceName}</div>
            <div className="service-description">{description}</div>
        </div>
    );
}
