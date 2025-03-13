import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

  // Utility function to format and compare dates
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  // Carousel responsiveness settings
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
    <h1 className="my-3 text-center">Today's Student Birthdays</h1>
    <div className="birthday-banner ">
      <p style={{color:"wheat",textAlign:'center',fontSize:'50px',fontWeight:"bolder"}}>HAPPY BIRTHDAY</p>
      <Carousel
        responsive={responsive}
        arrows={false}
        swipeable={true}
        autoPlay={true} // Enable autoplay
        autoPlaySpeed={4000} // Set autoplay speed (in milliseconds)
        infinite={true} // Enable infinite looping
        autoFocus={true}
       pauseOnHover={true}
       transitionDuration={2000}
      >
       
        {api
          .filter((item) => formatDate(item.dob) === currentDate) 
          .map((item, index) => (
            <div className='d-flex  justify-content-center'  key={index}>
                <h2 className="text-light">{item.name}</h2>              
          </div>
          ))}
         
      </Carousel>
    </div>
    </>
  );
};

export default StudentDetails;
