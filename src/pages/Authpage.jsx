import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "../styles/authPage.css"; // Point to the new single CSS file

const AuthPage = () => {
    const [isLogIn, setIsLogIn] = useState(true);

    const toggleIsLogIn = () => {
        setIsLogIn((prev) => !prev);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div>
                    <h2 className="auth-title">
                        {isLogIn ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="auth-subtitle">
                        {isLogIn 
                            ? "Enter your details to access your journal" 
                            : "Start your journey with Slate of Mind"}
                    </p>
                </div>

                {isLogIn ? <Login /> : <Signup />}

                <div className="auth-footer">
                    {isLogIn ? "Don't have an account?" : "Already have an account?"}
                    <button className="auth-toggle-btn" onClick={toggleIsLogIn}>
                        {isLogIn ? "Sign up" : "Log in"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;