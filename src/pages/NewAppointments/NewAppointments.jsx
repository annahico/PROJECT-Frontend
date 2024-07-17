import { useState } from 'react';
import { Header } from '../../common/Header/Header';
import { CreateAppointment } from "../../services/apiCalls";
import "./NewAppointments.css";

const NewAppointment = () => {
    const [appointmentData, setAppointmentData] = useState({
        appointmentDate: "",
        service_id: "",
        tattoo_artist_id: "",
        user_id: ""
    });
    const [message, setMessage] = useState('');

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setAppointmentData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const passport = JSON.parse(localStorage.getItem("passport"));
            const token = passport.token;
            const response = await CreateAppointment(token, appointmentData);
            if (response.success) {
                setMessage(response.message);
                setAppointmentData({
                    appointmentDate: "",
                    service_id: "",
                    tattoo_artist_id: "",
                });
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage('Appointment cannot be created');
        }
    };

    return (
        <div>
            <Header />
            <div className='newAppointmentDesign'>
                <div className='titleDesign'>
                    Request your appointment
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Select date and time</label>
                        <input
                            className="custom-datetime"
                            type="datetime-local"
                            name='appointmentDate'
                            value={appointmentData.appointmentDate || ""}
                            onChange={inputHandler}
                            required
                        />
                    </div>
                    <div>
                        <label>Select a service</label>
                        <input
                            className='selectDesign'
                            type="number"
                            name='service_id'
                            placeholder="Service ID"
                            value={appointmentData.service_id || ""}
                            onChange={inputHandler}
                            required
                        />
                    </div>
                    <div>
                        <label>Select a tattoo artist</label>
                        <input
                            className='selectDesign'
                            type="number"
                            name='tattoo_artist_id'
                            placeholder="Tattoo Artist ID"
                            value={appointmentData.tattoo_artist_id || ""}
                            onChange={inputHandler}
                            required
                        />
                    </div>
                    <button 
                        className='deleteButtonDesign'
                        type="submit">Request appointment
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default NewAppointment;
