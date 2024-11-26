import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // For error messages
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault(); // Correct method to prevent form submission

        try {
            const response = await axios.post(
                'http://localhost:3000/register',
                { name:name, email:email, password:password }
            );
            navigate('/login'); // Redirect to login on success
        } catch (err) {
           
            setError(err.response?.data?.error || 'An error occurred'); // Show error on the UI
        }
    };

    return (
        <div className="container">
           <div className="d-flex justify-content-center align-items-center vh-100">
           <div className="p-4 border w-25 rounded shadow">
                    <h1>Register</h1>
                    <form onSubmit={submit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control my-2"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control my-2"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="form-control my-2"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    <p>
                        If Already Registered? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
