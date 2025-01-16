import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault(); // Correct method to prevent default form submission

        try {
            // Send POST request to login endpoint
            const { data } = await axios.post('http://localhost:3000/login', {
                email:email,
                password:password,
            });

          

            if (data.message === 'Login successful') {
                
                navigate('/dashboard'); // Navigate to dashboard on successful login
            } else {
                setError('Invalid credentials'); // Display server error
            }
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="container">
                <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-4 border w-25 rounded shadow">
                    <h1>Login</h1>
                    <form onSubmit={submit}>
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
                    {error && <div className="alert alert-danger mt-3">{error}</div>} {/* Display errors */}
                </div>
            </div>
        </div>
    );
};

export default Login;
