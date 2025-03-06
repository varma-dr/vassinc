import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [error , setError] = useState("");
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred"); 
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <div className="container">
      <div className="company-badge">
        <div className="company-name">Vass INC</div>
        <div className="company-underline"></div>
      </div>
      
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      
      <div className="form-content">
        <div className="inputs">
          <div className="input">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" />
          </div>
          
          <div className="input">
            <i className="fas fa-lock"></i>
            <input 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Password" 
            />
            <i 
              className={`password-toggle fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>
        
        <div className="forgot-password">
          Forgot Password? <span>Reset</span>
        </div>
        
        <div className="submit-container">
          <div className="submit">Login</div>
        </div>
        
        <div className="signup-prompt">
          Don't have an account? <span onClick={goToSignup}>Sign Up</span>
        </div>
      </div>
    </div>
  )
}

export default Login