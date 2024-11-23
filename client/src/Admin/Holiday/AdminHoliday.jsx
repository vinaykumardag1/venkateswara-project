import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
      <div className="d-flex flex-column justify-content-center align-items-center vh-90">
      <div className="d-flex justify-content-between gap-3 my-5">
      <Link to='/holiday-admin'><button className="btn btn-primary">+Add Holiday</button></Link>
      <Link to='/admin'><button className="btn btn-primary">+Add Event</button></Link>  
      <Link to='/holiday'><button className="btn btn-primary">Holiday data</button></Link>
      <Link to='/events'><button className="btn btn-primary">Events Data</button></Link>
       </div>
      <div className="p-4 border rounded shadow">
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
            Save Date and Holiday
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
