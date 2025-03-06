import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

export const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  const goToLogin = () => {
    navigate('/login');
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.msg || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='container'>
      <div className='company-badge'>
        <div className='company-name'>Vass INC</div>
        <div className='company-underline'></div>
      </div>
      <div className='form-content'>
        <div className='header'>
          <div className='text'>Sign Up</div>
          <div className='underline'></div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className='inputs'>
            <div className='input'>
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='input'>
              <i className="fas fa-envelope"></i>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='input'>
              <i className="fas fa-lock"></i>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`password-toggle fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>
          <div className='submit-container'>
            <button 
              type="submit" 
              className='submit'
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className='login-prompt'>
          Already have an account? <span onClick={goToLogin}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;