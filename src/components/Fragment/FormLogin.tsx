import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './styleLogin.css';  // Pastikan file CSS diimport

export const FormLogin = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const Auth = async (e: React.FormEvent) => { 
        e.preventDefault();
        //console.log({ username, password }); 
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                username,
                password,
            });
            console.log({ msg: "Login berhasil" })
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            navigate('/menu/');
        } catch (error: any) {
            console.error("Login error:", error);
            if (error.response) {
                console.error("Server response status:", error.response.status);
                console.error("Server response data:", error.response.data);
            } else {
                console.error("Unexpected error:", error.message);
            }
        }
    };

    return (
        <section className="">
            <div className="form-container">
                <form onSubmit={Auth} className="login-box">
                    <div className="field">
                        <label className="label">Email or Username</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                placeholder="Enter your username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input 
                                type="password" 
                                className="input" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button login-button" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </section>
    );
};
