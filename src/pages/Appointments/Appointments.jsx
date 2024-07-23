import { useState } from 'react';
import { useSelector } from "react-redux";
import { appointments } from '../../services/apiCalls';
import { userData } from "../userSlice";
import './Appointments.css';

export const Appointments = () => {
  const [appointmentData, setAppointmentData] = useState({
    tattoo_artist_id: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rdxUserData = useSelector(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({
      ...appointmentData,
      [name]: value,
    });
  };

  const handleCreateAppointment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await appointments(rdxUserData.credentials.token, appointmentData);
      console.log(response.data);
      // Clear form or show success message
    } catch (error) {
      console.error('Error creating the appointment:', error.message);
      setError('Failed to create the appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointmentsDesign">
      <div className='containerAppointment'>
        <div className='title'>ARTIST ID</div>
        <div className='inputAppointment'>
          <input
            type='text'
            name='tattoo_artist_id'
            onChange={handleInputChange}
            value={appointmentData.tattoo_artist_id}
            required
          />
        </div>
        <div className='title'>DATE</div>
        <div className='inputAppointment'>
          <input
            type='datetime-local'
            name='date'
            onChange={handleInputChange}
            value={appointmentData.date}
            required
          />
        </div>
        {error && <div className='error'>{error}</div>}
        <button 
          onClick={handleCreateAppointment} 
          className='buttonSubmit'
          disabled={loading}
        >
          {loading ? 'Creating...' : 'CREATE'}
        </button>
      </div>
    </div>
  );
};
