import PropTypes from 'prop-types';
import "./ProfileCard.css";

export const ProfileCard = ({ first_name, last_name, email }) => (
    <div className="profileCardDesign">
        <div>{first_name}</div>
        <div>{last_name}</div>
        <div>{email}</div>
    </div>
);

ProfileCard.propTypes = {
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};
