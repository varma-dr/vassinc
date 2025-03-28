import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../assets/VassInc logo.png";  

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set the page title dynamically
  useEffect(() => {
    document.title = "VASS INC - Login";
  }, []);

  // Regular expression for validating email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-600">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-lg text-white w-full max-w-md">
        
        {/* VASS INC Branding */}
        <div className="text-center mb-4">
          {/* Display Logo */}
          <img src={Logo} alt="VASS INC Logo" className="mx-auto w-34 h-34 mb-6" />
        </div>
        <h1 className="text-4xl font-extrabold text-center mb-2 text-yellow-300">
          VASS INC
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-6">Employee Login</h2>

        {/* Welcome Message */}
        {isLoggedIn && (
          <div className="text-center mb-8 text-yellow-300">
            <h3>Welcome!!</h3>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div className="relative">
            <FaUser className="absolute left-4 top-4 text-yellow-300" />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required 
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-300">
          Don't have an account? 
          <Link to="/register" className="text-yellow-300 hover:underline ml-2">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
