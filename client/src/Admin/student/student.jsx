import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Student = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [dob, setDob] = useState(''); // Changed from `date` to `dob`
    const [address, setAddress] = useState('');
    const [batch, setBatch] = useState('2023-25'); // Set a default value
    const [section, setSection] = useState('A'); // Set a default value
 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/student-data', {
                name,
                email,
                number,
                dob, 
                address,
                batch,
                section,
            });
            if (response.status === 200) {
                alert("data saved succesfully")
                window.location.reload(); 
             
            } else {
                alert('Failed to save student data.');
                
            }

        } catch (error) {
            alert(`An error occurred while saving the data: ${error.message}`);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div>
                <h1 className="my-3">Student Admin</h1>
                <form >
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        className="form-control my-1"
                        name="name"
                        id="name"
                        placeholder="Enter Student Fullname"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control my-1"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter student email"
                        required
                    />
                    <label htmlFor="number">Phone Number</label>
                    <input
                        type="number"
                        className="form-control my-1"
                        name="phone"
                        id="phone"
                        placeholder="Enter student Number"
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control my-1"
                        name="dob"
                        id="dob"
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                    <label htmlFor="address">Address</label>
                    <textarea
                        name="address"
                        id="address"
                        className="form-control my-1"
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter student address"
                        required
                    ></textarea>
                    <label htmlFor="batch">Batch</label>
                    <select
                        name="batch"
                        id="batch"
                        className="form-control my-1"
                        onChange={(e) => setBatch(e.target.value)}
                        defaultValue="2023-25"
                    >
                        <option value="2023-25">2023-2025</option>
                        <option value="2024-26">2024-26</option>
                        <option value="2025-27">2025-27</option>
                    </select>
                    <label htmlFor="section">Section</label>
                    <select
                        name="section"
                        id="section"
                        className="form-control"
                        onChange={(e) => setSection(e.target.value)}
                        defaultValue="A"
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Student;
