import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
const StudentDetails = () => {
  const [api, setApi] = useState([]); // Initialize with an empty array
  const [currentDate, setCurrentDate] = useState('');
  
  // Fetching student data from the server
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/student-data');
        setApi(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    getData();
  }, []);

  // Get current date in DD/MM/YYYY format
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  // Utility function to compare only date part of dob
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className='birthday-banner '>
      {api.map((item, index) => (
        <ul key={index} type='none'>
         
          <li className='w-25'>
            {formatDate(item.dob) === currentDate ? <p> {item.name}</p> : null}
          </li>
          <li><a href={item.email}>{item.email}</a>
          </li>
        </ul>
      ))}
   
    </div>
  );
};

export default StudentDetails;
