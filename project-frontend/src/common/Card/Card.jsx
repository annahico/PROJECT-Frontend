import "./Card.css";

export const Card = ({ name, description, clickFunction }) => {
    return (
        <div className="cardDesign" onClick={clickFunction}>
            <div>{name}</div>
            <div>{description}</div>
        </div>
    );
}

export const UserCard = ({ firstName, lastName, email, isDeletable, onDelete }) => {
    return (
        <div className="cardUserDesign">
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{email}</div>
            {isDeletable && <button onClick={onDelete}>Delete</button>}
        </div>
    );
}

export const ServiceCard = ({ service, appointmentDate, onDelete }) => {
    return (
        <div className="cardServiceDesign">
            <div>{service}</div>
            <div>{appointmentDate}</div>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}
