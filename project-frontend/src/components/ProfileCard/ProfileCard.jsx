import "./ProfileCard.css";

export const ProfileCard = ({ first_name, last_name, email }) => (  //añadir prop firts_name
    <div className="profileCardDesign">
        <div>{first_name}</div>
        <div>{last_name}</div>
        <div>{email}</div>
    </div>
);
