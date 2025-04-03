import { useState } from "react";
import { FaUserTie, FaUserGraduate, FaUsers, FaExclamationCircle } from "react-icons/fa";

const UserTypeSelector = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState({
    visaInfo: "",
    specialization: "",
    education: "",
  });
  const [recruiterDetails, setRecruiterDetails] = useState({
    yearsOfExp: "",
    pastCompany: "",
    education: "",
  });
  const [employeeDetails, setEmployeeDetails] = useState({
    companyName: "",
    position: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const cardSpacing = 16; // Spacing between cards

  const userTypes = [
    { type: "candidate", label: "Candidate", icon: <FaUserGraduate size={80} /> },
    { type: "recruiter", label: "Recruiter", icon: <FaUserTie size={80} /> },
    { type: "employee", label: "Employee", icon: <FaUsers size={80} /> },
  ];

  const handleSelection = (type) => {
    setSelectedUserType(type);
    if (errors.userType) {
      setErrors((prev) => ({ ...prev, userType: null }));
    }
  };

  const handleCandidateChange = (e) => {
    const { name, value } = e.target;
    setCandidateDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleRecruiterChange = (e) => {
    const { name, value } = e.target;
    setRecruiterDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate user type selection
    if (!selectedUserType) {
      newErrors.userType = "Please select a user type";
    }

    // Validate fields based on user type
    if (selectedUserType === "candidate") {
      if (!candidateDetails.visaInfo.trim()) {
        newErrors.visaInfo = "Visa info is required";
      }
      if (!candidateDetails.specialization.trim()) {
        newErrors.specialization = "Specialization is required";
      }
      if (!candidateDetails.education.trim()) {
        newErrors.education = "Education is required";
      }
    } else if (selectedUserType === "recruiter") {
      if (!recruiterDetails.yearsOfExp) {
        newErrors.yearsOfExp = "Years of experience is required";
      }
      if (!recruiterDetails.pastCompany.trim()) {
        newErrors.pastCompany = "Past company is required";
      }
      if (!recruiterDetails.education.trim()) {
        newErrors.education = "Education is required";
      }
    } else if (selectedUserType === "employee") {
      if (!employeeDetails.companyName.trim()) {
        newErrors.companyName = "Company name is required";
      }
      if (!employeeDetails.position.trim()) {
        newErrors.position = "Position is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      console.log("Form submitted successfully");
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-indigo-200 bg-subtle-texture">
      {/* Subtle Dark Overlay (optional, can be adjusted) */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>

      {/* Glassmorphism Card with Elegant Darker Colors - More Curved Edges and Border */}
      <div className="relative z-10 bg-white bg-opacity-60 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-md-elegant text-gray-800 w-full max-w-md border border-gray-300">
        <h1 className="text-2xl font-medium text-center mb-6 text-gray-600">Register As:</h1>

        {/* User Type Selection Cards */}
        <div className="flex justify-center mt-6 transition-all duration-300">
          {userTypes.map(({ type, label, icon }) => (
            <label
              key={type}
              className={`cursor-pointer flex flex-col items-center p-4 border-2 rounded-lg transition-all duration-300 shadow-md w-32 text-center transform
                ${selectedUserType === type ? "border-teal-500 bg-teal-100 bg-opacity-90 scale-105 z-10" : "border-gray-300 bg-white bg-opacity-80 hover:bg-gray-100 hover:bg-opacity-80"}
                ${selectedUserType && selectedUserType !== type ? "opacity-75 blur-[0.5px]" : ""}
                ${submitted && errors.userType && !selectedUserType ? "border-red-500" : ""}`}
              onClick={() => handleSelection(type)}
              style={{
                pointerEvents: selectedUserType ? (selectedUserType === type ? 'auto' : 'auto') : 'auto',
                marginLeft: selectedUserType && selectedUserType !== type ? cardSpacing / 2 + 'px' : cardSpacing + 'px',
                marginRight: selectedUserType && selectedUserType !== type ? cardSpacing / 2 + 'px' : cardSpacing + 'px',
              }}
            >
              {/* Visible radio button */}
              <div className="flex justify-end w-full mb-2">
                <div className={`h-5 w-5 rounded-full border-2 ${selectedUserType === type ? "border-teal-500" : "border-gray-400"} flex items-center justify-center`}>
                  {selectedUserType === type && (
                    <div className="h-3 w-3 rounded-full bg-teal-500"></div>
                  )}
                </div>
              </div>

              {/* Icon with improved contrast */}
              <div className="text-gray-800">
                {icon}
              </div>
              <span className="mt-2 font-medium text-gray-700">{label}</span>
              <input
                type="radio"
                name="userType"
                value={type}
                checked={selectedUserType === type}
                onChange={() => handleSelection(type)}
                className="hidden"
                required
              />
            </label>
          ))}
        </div>

        {/* Error message for user type */}
        {submitted && errors.userType && (
          <div className="text-red-500 mt-2 text-center flex items-center justify-center">
            <FaExclamationCircle className="mr-1" />
            <span>{errors.userType}</span>
          </div>
        )}

        {/* Dynamic Form Fields based on User Type */}
        {selectedUserType === "candidate" && (
          <div className="mt-6">
            <div className="relative mb-4">
              <input
                type="text"
                name="visaInfo"
                value={candidateDetails.visaInfo}
                onChange={handleCandidateChange}
                placeholder="Visa Info"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.visaInfo ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.visaInfo && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.visaInfo}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="specialization"
                value={candidateDetails.specialization}
                onChange={handleCandidateChange}
                placeholder="Specialization"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.specialization ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.specialization && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.specialization}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="education"
                value={candidateDetails.education}
                onChange={handleCandidateChange}
                placeholder="Education"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.education ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.education && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.education}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedUserType === "recruiter" && (
          <div className="mt-6">
            <div className="relative mb-4">
              <input
                type="number"
                name="yearsOfExp"
                value={recruiterDetails.yearsOfExp}
                onChange={handleRecruiterChange}
                placeholder="Years of Experience"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.yearsOfExp ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.yearsOfExp && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.yearsOfExp}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="pastCompany"
                value={recruiterDetails.pastCompany}
                onChange={handleRecruiterChange}
                placeholder="Past Company"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.pastCompany ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.pastCompany && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.pastCompany}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="education"
                value={recruiterDetails.education}
                onChange={handleRecruiterChange}
                placeholder="Education"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.education ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.education && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.education}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedUserType === "employee" && (
          <div className="mt-6">
            <div className="relative mb-4">
              <input
                type="text"
                name="companyName"
                value={employeeDetails.companyName}
                onChange={handleEmployeeChange}
                placeholder="Company Name"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.companyName ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.companyName && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.companyName}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="position"
                value={employeeDetails.position}
                onChange={handleEmployeeChange}
                placeholder="Position"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.position ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.position && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.position}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Note about required fields */}
        {selectedUserType && (
          <div className="mt-2 text-sm text-gray-600 opacity-70">
            All fields are required
          </div>
        )}

        {/* Button to continue */}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-md shadow-md-elegant-button focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 mt-6"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserTypeSelector;