import React, { useState } from "react";
import { FaUser } from "react-icons/fa";  
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({});

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";

    setErrors(newErrors);  
    return Object.keys(newErrors).length === 0; 
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');  
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

      {/* Submit Button */}
      <button type="submit" className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg">
        Continue Registration
      </button>
    </form>
  );
};

export default RegistrationForm;
