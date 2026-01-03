import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import {useShallow} from "zustand/shallow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "../styles/authPage.css";

function Login() {
    const {login, isLoggingIn} = useAuthStore(useShallow(
        (state)=>({
            login: state.login,
            isLoggingIn: state.isLoggingIn,
        })
    ));
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    const handleChangeValue = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label" htmlFor="usernameOrEmail">Username or Email</label>
                <input
                    className="auth-input"
                    type="text"
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    placeholder="Enter your username"
                    value={formData.usernameOrEmail}
                    onChange={handleChangeValue}
                    required
                />
            </div>
            
            <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                    className="auth-input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChangeValue}
                    required
                />
            </div>
            <button className="auth-btn-submit" type="submit">
                
                {isLoggingIn?"logging in":"Log In"}
                {isLoggingIn && <FontAwesomeIcon icon={faSpinner} className='logging-in-spinner'/>}
            </button>
        </form>
    );
}

export default Login;