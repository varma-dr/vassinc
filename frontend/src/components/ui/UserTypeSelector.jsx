import React, { useState } from "react";
import { FaUserTie, FaUserGraduate, FaUsers } from "react-icons/fa";

const UserTypeSelector = ({ onSelect }) => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const userTypes = [
    { type: "candidate", label: "Candidate", icon: <FaUserGraduate size={60} /> },
    { type: "recruiter", label: "Recruiter", icon: <FaUserTie size={60} /> },
    { type: "employee", label: "Employee", icon: <FaUsers size={60} /> },
  ];

  const handleSelection = (type) => {
    setSelectedUserType(type);
    if (onSelect) onSelect(type);
  };

  return (
    <div className="flex space-x-4 justify-center mt-6">
      {userTypes.map(({ type, label, icon }) => (
        <label
          key={type}
          className={`cursor-pointer flex flex-col items-center p-4 border-2 rounded-lg transition-all duration-300 shadow-md w-32 text-center transform 
            ${selectedUserType === type ? "border-yellow-400 bg-yellow-100 scale-110" : "border-gray-300 bg-white hover:bg-gray-100"}`}
          onClick={() => handleSelection(type)}
        >
          {icon}
          <span className="mt-2 font-medium text-gray-700">{label}</span>
          <input
            type="radio"
            name="userType"
            value={type}
            checked={selectedUserType === type}
            onChange={() => handleSelection(type)}
            className="hidden"
          />
          {selectedUserType === type && (
            <div className="mt-2">
              <input type="radio" checked readOnly className="w-4 h-4 text-yellow-400" />
            </div>
          )}
        </label>
      ))}
    </div>
  );
};

export default UserTypeSelector;
