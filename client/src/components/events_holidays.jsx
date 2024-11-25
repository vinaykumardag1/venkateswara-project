import React,{useEffect,useState} from 'react'
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import Navbar from './Navbar';
const Events_holidays = () => {
    const [holiday, setHoliday] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const holidayResponse = await axios.get("http://localhost:3000/api/holiday");
        setHoliday(holidayResponse.data); // Update state with fetched data

        const eventsResponse = await axios.get("http://localhost:3000/api/event");
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getData();
  }, []);
  return (
    <>
        <Navbar/>
       <div className="container">
     
      <div className="d-flex  justify-content-center">
      
     <div>
      <h1 className="text-center my-3">Dashboard</h1>  {/* Bar Chart */}
      <BarChart
        xAxis={[{ scaleType: "band", data: ["Holiday and Events"] }]}
        series={[{ data: [holiday.length]},{ data:[events.length] }]}
        height={300}
        width={500}
      />

      
     <ul type="square" className="d-flex gap-5">
      <li style={{color:"#02b2af"}}>Holidays: {holiday.length}</li>
      <li style={{color:"#2e96ff"}}>Events: {events.length}</li>
     </ul>
        
      </div>
      
    </div>
    <div className=" my-5 d-flex flex-row gap-4 justify-content-center">
   <table className="w-50 text-center table table-striped">
    <thead>
      <tr>
        <th scope="col">S.no</th>
        <th scope="col">Date</th>
        <th scope="col">Events</th>
      </tr>
    </thead>
    <tbody>
     
        {events.map((item,index)=>(
          <tr key={index}>
          <td scope="row">{index+1}</td>
          <td>{item.date}</td>
          <td>{item.event}</td>
          </tr>
        ))}
      
    </tbody>
   </table>
   <table className="w-50 text-center table  table-striped">
    <thead>
      <tr>
        <th scope="col">S.no</th>
        <th scope="col">Date</th>
        <th scope="col">Holidays</th>
      </tr>
    </thead>
    <tbody>
     
        {holiday.map((item,index)=>(
          <tr key={index}>
          <td scope="row">{index + 1}</td>
          <td>{item.date}</td>
          <td>{item.holiday}</td>
          </tr>
        ))}
      
    </tbody>
   </table>
   </div>
   </div>
    </>
  )
}

export default Events_holidays;
