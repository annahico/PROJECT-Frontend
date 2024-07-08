import "./AppointmentCard.css";

export const AppointmentCard = ({ service_id, appointment_date }) => {
    return (
        <div className="appointmentCardDesign">
            <div>{service_id}</div>
            <div>{appointment_date}</div>
        </div>
    );
}

// AppointmentCard.propTypes = {
//     service_id: PropTypes.string.isRequired,
//     appointment_date: PropTypes.string.isRequired,
// };
