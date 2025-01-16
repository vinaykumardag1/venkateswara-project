import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './footer';
import './style.css';
import { BarChart } from "@mui/x-charts/BarChart";

const Student_Data = () => {
  const [api, setApi] = useState([]); // Initialize with all fetched data
  const [filteredData, setFilteredData] = useState([]); // Data to be displayed
  const [sections, setSections] = useState([]); // Unique sections for the dropdown
  const [batches, setBatches] = useState([]); // Unique batches for the dropdown
  const [selectedSection, setSelectedSection] = useState(''); // Current selected section
  const [selectedBatch, setSelectedBatch] = useState(''); // Current selected batch

  // Fetching student data from the server
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/student-data');
        setApi(response.data); // Update state with fetched data
        setFilteredData(response.data); // Initially show all data

        // Extract unique sections for dropdown
        const uniqueSections = [
          ...new Set(response.data.map((item) => item.section)),
        ];
        setSections(uniqueSections);

        // Extract unique batches for dropdown
        const uniqueBatches = [
          ...new Set(response.data.map((item) => item.batch)),
        ];
        setBatches(uniqueBatches);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    getData();
  }, []);

  // Handle section selection change
  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    filterData(e.target.value, selectedBatch);
  };

  // Handle batch selection change
  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
    filterData(selectedSection, e.target.value);
  };

  // Filter data based on section and batch
  const filterData = (section, batch) => {
    let filtered = api;
    if (section) {
      filtered = filtered.filter((item) => item.section === section);
    }
    if (batch) {
      filtered = filtered.filter((item) => item.batch === batch);
    }

    setFilteredData(filtered);
  };

  // Group data by batches and sections
  const groupedData = batches.map((batch) => {
    return sections.map(
      (section) => api.filter((item) => item.batch === batch && item.section === section).length
    );
  });

  // Create chart series dynamically from groupedData
  const chartSeries = sections.map((section, index) => ({
    label: section,
    data: groupedData.map((group) => group[index]),
  }));

  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <div className="d-flex justify-content-center">
          <div>
            <h1 className="text-center my-3">Dashboard</h1>

            {/* BarChart Component */}
            <BarChart
              xAxis={[{ scaleType: "band", data: batches }]} // Batches as X-axis labels
              series={chartSeries.map((seriesData) => ({
                data: seriesData.data,
                label: seriesData.label,
              }))}  // Passing dynamic data for each section (A, B, C, etc.)
              height={400}
              width={700}
            />
          </div>
        </div>

        {/* Filters for section and batch */}
        <div className='filters d-flex mb-4'>
          {/* Dropdown for section selection */}
          <div className='w-25 my-3'>
            <label htmlFor="section-select">Select Section: </label>
            <select
              id="section-select"
              value={selectedSection}
              onChange={handleSectionChange}
              className='form-control'
            >
              <option value="">All Sections</option>
              {sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for batch selection */}
          <div className='w-25 my-3'>
            <label htmlFor="batch-select">Select Batch: </label>
            <select
              id="batch-select"
              value={selectedBatch}
              onChange={handleBatchChange}
              className='form-control'
            >
              <option value="">All Batches</option>
              {batches.map((batch, index) => (
                <option key={index} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display filtered student data */}
        <table className='table table-striped text-center student-table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Section</th>
              <th>Roll Number</th>
              <th>Batch</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.section}</td>
                <td>{item.rollNumber}</td>
                <td>{item.batch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Student_Data;
