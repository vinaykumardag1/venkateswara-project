import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const Dashboard = () => {
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
  }, []); // Run once when the component mounts

  return (
    <div className=" d-flex justify-content-center">
      
<div>
    <h1 className="text-center my-3">Dashboard</h1>  {/* Bar Chart */}
      <BarChart
        xAxis={[{ scaleType: "band", data: ["Holiday and Events"] }]}
        series={[{ data: [holiday.length]},{ data:[events.length] }]}
        height={500}
        width={700}
      />

      {/* Holiday List */}
     <ul type="square" className="d-flex gap-5">
      <li style={{color:"#02b2af"}}>Holidays: {holiday.length}</li>
      <li style={{color:"#2e96ff"}}>Events: {events.length}</li>
     </ul>
        
      </div>
    </div>
  );
};

export default Dashboard;
