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

  // Get current date in DD/MM format
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    });
    setCurrentDate(formattedDate);
  }, []);

  // Utility function to format and compare date
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <div className="birthday-banner container">
      <h1 className="my-3 text-center">Today's Student Birthdays</h1>
      <table className="table table-striped student-table">
        <thead>
          <tr>
            <th scope="col">S.NO</th>
            <th scope="col">Roll No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {api
            .filter((item) => formatDate(item.dob) === currentDate) // Filter students whose birthday matches current date
            .map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.rollNumber}</td>
                <td>{item.name}</td>
                <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
