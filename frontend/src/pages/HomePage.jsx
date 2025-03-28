import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../assets/logo.jpg";  // Ensure this path is correct

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
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
          <img src={Logo} alt="VASS INC Logo" className="mx-auto w-24 h-24 mb-4" />
        </div>
        <h1 className="text-4xl font-extrabold text-center mb-2 text-yellow-300">
          VASS INC
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-6">Employee Login</h2>

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
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-yellow-300" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required 
            />
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
