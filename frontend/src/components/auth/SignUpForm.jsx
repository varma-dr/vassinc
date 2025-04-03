import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/VassInc_logo.png";
import axios from "axios";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "+1", 
    mobileNumber: "",
    sameForWhatsApp: true, 
    whatsAppCountryCode: "+1", 
    whatsAppNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  
  const countryCodes = [
    { code: "+1", country: "US/CA" },
    { code: "+91", country: "IN" },
  
  ];

  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  const phoneRegex = /^\d{7,15}$/;

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      // For the "Same for WhatsApp" checkbox
      setFormData({ 
        ...formData, 
        [name]: checked,
        // If checked, sync WhatsApp number with mobile number
        ...(name === "sameForWhatsApp" && checked ? {
          whatsAppCountryCode: formData.countryCode,
          whatsAppNumber: formData.mobileNumber
        } : {})
      });
    } else {
      
      setFormData({ ...formData, [name]: value });
      
      
      if ((name === "countryCode" || name === "mobileNumber") && formData.sameForWhatsApp) {
        const whatsAppField = name === "countryCode" ? "whatsAppCountryCode" : "whatsAppNumber";
        setFormData(prev => ({
          ...prev,
          [name]: value,
          [whatsAppField]: value
        }));
      }
    }
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
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else if (!phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid mobile number.";
    }
    if (!formData.sameForWhatsApp && !formData.whatsAppNumber) {
      newErrors.whatsAppNumber = "WhatsApp number is required.";
    } else if (!formData.sameForWhatsApp && !phoneRegex.test(formData.whatsAppNumber)) {
      newErrors.whatsAppNumber = "Please enter a valid WhatsApp number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle API registration and continue registration flow
  const handleContinue = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Log the data being sent
        console.log("Sending data to API:", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,

        });

        // Use the full URL with the correct port (5005)
        const response = await axios.post('http://localhost:5005/api/users', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          
        });

        console.log("API Response:", response.data);
        
        // Store token in localStorage (for authentication)
        localStorage.setItem('token', response.data.token);
        
        console.log("Registration successful, navigating to UserTypeSelector");
        navigate("/UserTypeSelector");
      } catch (error) {
        // Detailed error logging
        console.error("Registration error:", error);
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
          
          if (error.response.data.msg === 'User already exists') {
            setErrors({...errors, email: "This email is already registered."});
          } else {
            alert(`Registration failed: ${error.response.data.msg || "Please try again later."}`);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error request:", error.request);
          alert("No response from server. Please check your connection and try again.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
          alert("Registration failed. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleContinue();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-indigo-200 bg-subtle-texture">
      {/* Subtle Dark Overlay (optional, can be adjusted) */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>

      {/* Glassmorphism Card with Elegant Darker Colors - More Curved Edges and Border */}
      <div className="relative z-10 bg-white bg-opacity-60 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-md-elegant text-gray-800 w-full max-w-md border border-gray-300">

        {/* VASS INC Branding */}
        <div className="text-center mb-4">
          {/* Display Logo */}
          <img
            src={Logo}
            alt="VASS INC Logo"
            className="mx-auto w-48 h-32 mb-4 drop-shadow-md"
            onError={(e) => console.error("Logo failed to load:", e)}
          />
        </div>

        <h2 className="text-xl font-medium text-center mb-6 text-gray-600 text-2xl">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Mobile Number with Country Code */}
          <div className="flex space-x-2 ">
            <div className="relative w-1/3">
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
              <div className="flex items-center gap-2"></div>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-full pl-10 pr-2 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} ({country.country})
                  </option>
                ))}
              </select>
            </div>
            <div className="relative w-2/3">
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
                style={{paddingLeft: '8px'}}
              />
            </div>
          </div>
          {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
          
          {/* Same for WhatsApp Checkbox */}
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="sameForWhatsApp"
              id="sameForWhatsApp"
              checked={formData.sameForWhatsApp}
              onChange={handleChange}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="sameForWhatsApp" className="text-gray-700">
              Same for WhatsApp
            </label>
          </div>
          
          {/* WhatsApp Number (conditionally displayed) */}
          {!formData.sameForWhatsApp && (
            <>
              <div className="flex space-x-2 mt-2">
                <div className="relative w-1/3">
                  <FaPhone className="absolute left-3 top-3 text-gray-500" />
                  <select
                    name="whatsAppCountryCode"
                    value={formData.whatsAppCountryCode}
                    onChange={handleChange}
                    className="w-full pl-10 pr-2 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code} ({country.country})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative w-2/3">
                  <input
                    type="tel"
                    name="whatsAppNumber"
                    placeholder="WhatsApp Number"
                    value={formData.whatsAppNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
                    style={{paddingLeft: '12px'}}
                  />
                </div>
              </div>
              {errors.whatsAppNumber && <p className="text-red-500 text-sm mt-1">{errors.whatsAppNumber}</p>}
            </>
          )}

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-teal-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-teal-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Continue Registration Button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-md shadow-md-elegant-button focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 mt-6 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Continue Registration"}
          </button>

          <div className="text-center mt-4 text-gray-600">
            <p>
              Already have an account?
              <Link to="/login" className="text-teal-600 hover:underline ml-2 font-medium">
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