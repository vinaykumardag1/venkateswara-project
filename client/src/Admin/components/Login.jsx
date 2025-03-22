import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();           
            const { data } = await axios.post('http://localhost:3000/adminlogin', {
                username: username,
                password: password,
            });

       
            if( data.message !== 'invalid credentails'){
                navigate("/admin")
                alert("login success")
            }else{
                alert("invalid credenttials")
            }
           
       
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-4 border w-25 rounded shadow">
                    <h1 className="mb-4 text-center">Login</h1>
                    <form onSubmit={submit} >
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Submit
                        </button>
                    </form>
                   
                </div>
            </div>
        </div>
    );
};

export default Login;
