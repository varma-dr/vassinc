import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom"; 
import Logo from "../../assets/VassInc_logo.png"; 

const SignUpForm = () => {  
  const navigate = useNavigate(); 


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", 
    
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  

  // Email Validation Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleContinue = () => {
    if (validateForm()) {
      console.log("Form Submitted Successfully!", formData);
      navigate("/UserTypeSelector"); // Redirect to UserTypeSelector page
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted Successfully!", formData);
      alert("Registration Successful!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-400">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-lg text-white w-full max-w-md">
        
        {/* VASS INC Branding */}
        <div className="text-center mb-4">
          {/* Display Logo */}
          <img 
            src={Logo} 
            alt="VASS INC Logo" 
            className="mx-auto w-56 h-40 mb-2 drop-shadow-lg" 
            onError={(e) => console.error("Logo failed to load:", e)}
          />
        </div>
        
        <h1 className="text-4xl font-extrabold text-center mb-1 text-yellow-300">
          VASS INC
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-4 text-yellow-300" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-4 text-yellow-300" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-yellow-300" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-yellow-300" />
            <input
              type={showPassword ? "text" : "password"}  
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <button 
              type="button" 
              className="absolute right-4 top-4 text-yellow-300"
              onClick={() => setShowPassword(!showPassword)}  
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}  
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-yellow-300" />
            <input
              type={showConfirmPassword ? "text" : "password"}  
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <button 
              type="button" 
              className="absolute right-4 top-4 text-yellow-300"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}  
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}  
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          {/* Continue Registration Button */}
          <button 
            type="button"
            onClick={handleContinue}  
            className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 mt-6"
          >
            Continue Registration
          </button>

          <div className="text-center mt-6 text-gray-300">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-300 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;