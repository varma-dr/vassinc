import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import necessary icons

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirmPassword visibility

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

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted Successfully!", formData);
      alert("Registration Successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Name */}
      <div className="relative">
        <FaUser className="absolute left-4 top-4 text-gray-700 dark:text-gray-200" />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-grey placeholder-gray-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
      </div>

      {/* Last Name */}
      <div className="relative">
        <FaUser className="absolute left-4 top-4 text-gray-700 dark:text-gray-200" />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-grey placeholder-gray-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
      </div>

      {/* Email */}
      <div className="relative">
        <FaEnvelope className="absolute left-4 top-4 text-gray-700 dark:text-gray-200" />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-grey placeholder-gray-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute left-4 top-4 text-gray-700 dark:text-gray-200" />
        <input
          type={showPassword ? "text" : "password"}  
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full pl-12 pr-10 py-3 rounded-lg bg-white bg-opacity-20 text-grey placeholder-gray-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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
        <FaLock className="absolute left-4 top-4 text-gray-700 dark:text-gray-200" />
        <input
          type={showConfirmPassword ? "text" : "password"}  
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full pl-12 pr-10 py-3 rounded-lg bg-white bg-opacity-20 text-grey placeholder-gray-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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
      <button type="submit" className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg">
        Continue Registration
      </button>
    </form>
  );
};

export default RegistrationForm;
