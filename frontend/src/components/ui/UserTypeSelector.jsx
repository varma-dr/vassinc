import { useState } from "react";
import { FaUserTie, FaUserGraduate, FaUsers, FaExclamationCircle } from "react-icons/fa";

const UserTypeSelector = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState({
    visaInfo: "",
    highestDegree: "",
    universityName: "",
    passedOutYear: ""
  });
  const [recruiterDetails, setRecruiterDetails] = useState({
    yearsOfExp: "",
    pastCompany: "",
    highestDegree: "",
    universityName: "",
    passedOutYear: ""
  });
  const [employeeDetails, setEmployeeDetails] = useState({
    companyName: "",
    position: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
      if (!candidateDetails.visaInfo) {
        newErrors.visaInfo = "Visa info is required";
      }
      if (!candidateDetails.highestDegree.trim()) {
        newErrors.highestDegree = "Highest degree is required";
      }
      if (!candidateDetails.universityName.trim()) {
        newErrors.universityName = "University name is required";
      }
      if (!candidateDetails.passedOutYear.trim()) {
        newErrors.passedOutYear = "Passed out year is required";
      }
    } else if (selectedUserType === "recruiter") {
      if (!recruiterDetails.yearsOfExp) {
        newErrors.yearsOfExp = "Years of experience is required";
      }
      if (!recruiterDetails.pastCompany.trim()) {
        newErrors.pastCompany = "Past company is required";
      }
      if (!recruiterDetails.highestDegree.trim()) {
        newErrors.highestDegree = "Highest degree is required";
      }
      if (!recruiterDetails.universityName.trim()) {
        newErrors.universityName = "University name is required";
      }
      if (!recruiterDetails.passedOutYear.trim()) {
        newErrors.passedOutYear = "Passed out year is required";
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
        <div className="flex space-x-4 justify-center mt-6">
          {userTypes.map(({ type, label, icon }) => (
            <label
              key={type}
              className={`cursor-pointer flex flex-col items-center p-4 border-2 rounded-lg transition-all duration-300 shadow-md w-32 text-center transform
                ${selectedUserType === type ? "border-teal-500 bg-teal-100 bg-opacity-90 scale-105" : "border-gray-300 bg-white bg-opacity-80 hover:bg-gray-100 hover:bg-opacity-80"}
                ${submitted && errors.userType && !selectedUserType ? "border-red-500" : ""}`}
              onClick={() => handleSelection(type)}
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
              <select
                name="visaInfo"
                value={candidateDetails.visaInfo}
                onChange={handleCandidateChange}
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.visaInfo ? "border-2 border-red-500" : ""
                }`}
                required
              >
                <option value="">Select Visa Type</option>
                <option value="F1-OPT">F1-OPT</option>
                <option value="H1B">H1B</option>
                <option value="H4-EAD">H4-EAD</option>
                <option value="L2">L2</option>
                <option value="GC">GC</option>
                <option value="USC">USC</option>
              </select>
              {submitted && errors.visaInfo && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.visaInfo}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <select
                name="highestDegree"
                value={candidateDetails.highestDegree}
                onChange={handleCandidateChange}
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.highestDegree ? "border-2 border-red-500" : ""
                }`}
                required
              >
                <option value="">Select Highest Degree</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
                <option value="Associate">Associate</option>
                <option value="High School">High School</option>
              </select>
              {submitted && errors.highestDegree && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.highestDegree}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="universityName"
                value={candidateDetails.universityName}
                onChange={handleCandidateChange}
                placeholder="University Name"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.universityName ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.universityName && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.universityName}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="number"
                name="passedOutYear"
                value={candidateDetails.passedOutYear}
                onChange={handleCandidateChange}
                placeholder="Passed Out Year"
                min="1950"
                max="2025"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.passedOutYear ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.passedOutYear && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.passedOutYear}</span>
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
                min="0"
                max="30"
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
                placeholder="Past Company Name"
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
              <select
                name="highestDegree"
                value={recruiterDetails.highestDegree}
                onChange={handleRecruiterChange}
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.highestDegree ? "border-2 border-red-500" : ""
                }`}
                required
              >
                <option value="">Select Highest Degree</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
                <option value="Associate">Associate</option>
                <option value="High School">High School</option>
              </select>
              {submitted && errors.highestDegree && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.highestDegree}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="universityName"
                value={recruiterDetails.universityName}
                onChange={handleRecruiterChange}
                placeholder="University Name"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.universityName ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.universityName && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.universityName}</span>
                </div>
              )}
            </div>
            <div className="relative mb-4">
              <input
                type="number"
                name="passedOutYear"
                value={recruiterDetails.passedOutYear}
                onChange={handleRecruiterChange}
                placeholder="Passed Out Year"
                min="1950"
                max="2025"
                className={`w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 ${
                  submitted && errors.passedOutYear ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {submitted && errors.passedOutYear && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.passedOutYear}</span>
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