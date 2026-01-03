import React, { useState } from "react";
import useAuthStore from "../store/authStore";

const Signup = () => {
    const signup = useAuthStore((state) => state.signup);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input
                        className="auth-input"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input
                        className="auth-input"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
                <input
                    className="auth-input"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                    className="auth-input"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                    className="auth-input"
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button className="auth-btn-submit" type="submit">Create Account</button>
        </form>
    );
};

export default Signup;