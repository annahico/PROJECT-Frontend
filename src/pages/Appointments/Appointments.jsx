import React, { useState } from 'react';
import './Appointments.css';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { appointments } from '../../services/apiCalls';

export const Appointments = () => {

        const [appointmentData, setAppointmentData] = useState({
            tattoo_artist_id: '',
            date: '',
            // time: '',
        });
    
        const rdxUserData = useSelector(userData);
    
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setAppointmentData({
                ...appointmentData,
                [name]: value,
            });
        };

        
    const handleCreateAppointment = async () => {
        try {
            const response = await appointments(rdxUserData.credentials.token, appointmentData);
            console.log(response.data);
        } catch (error) {
            console.error('Error creating the appointment', error.message);
            console.log(rdxUserData.credentials.token);   
            console.log(appointmentData);
        }
    };


    return (
        <div className="appointmentsDesign">
            <div className='containerAppointment'>
                <div className='title'>ARTIST</div>
                <div className='inputAppointment'>
                <input
                    type='text'
                    name='tattoo_artist_id'
                    onChange={handleInputChange}
                    value={appointmentData.artist}
                    required
                ></input>
                </div>
                <div className='title'>DATE</div>
                <div className='inputAppointment'>
                <input
                    type='datetime-local'
                    name='date'
                    onChange={handleInputChange}
                    value={appointmentData.date}
                    required
                ></input>
                </div>
                
                <button onClick={handleCreateAppointment} className='buttonSubmit'>CREATE</button>
            </div>
        </div>
    );
}