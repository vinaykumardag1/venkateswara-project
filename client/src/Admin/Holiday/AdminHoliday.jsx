import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [holiday, setHoliday] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      alert('Please select a date!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/holiday', {
        date: selectedDate,
        holiday:holiday,
      });
    
      if (response.status === 200) {
        alert('Date and event saved successfully!');
        navigate('/holiday'); // Navigate only after success
      } else {
        alert('Failed to save date and event.');
      }
    } catch (error) {
      console.error('Error saving date and event:', error);
      alert('An error occurred while saving the data.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="mt-5">
        <h1>Holiday Admin </h1>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter date"
            id="date"
            name="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
          <input
            type="text"
            name="holiday"
            id="holiday"
            className="form-control mt-3"
            placeholder="Enter the Holiday"
            value={holiday}
            onChange={(e) => setHoliday(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary mt-3">
            Save Date and Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
