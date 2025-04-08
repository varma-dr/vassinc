import React, { useState, useEffect } from 'react';
import Logo from "../../assets/VassInc_logo.png";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Array of US states for dropdowns (for both location fields and for location ID proof)
const usStates = [
  { value: '', label: 'Select a state' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

// A simple PasswordStrengthIndicator component (unchanged)
const PasswordStrengthIndicator = ({ password }) => {
  const hasUppercase = /[A-Z]/.test(password);
  const strength = password.length === 0 ? '' : hasUppercase ? 'Strong' : 'Weak';
  return (
    <p className="text-sm mt-1">
      {password.length > 0 && `Password Strength: ${strength}`}
    </p>
  );
};

// Header component for the top–right profile symbol with logout option
const Header = ({ profilePhoto, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <div className="absolute top-0 right-0 p-4">
      <div className="relative cursor-pointer" onClick={toggleDropdown}>
        {profilePhoto ? (
          <img src={profilePhoto} alt="Profile" className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
            P
          </div>
        )}
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
            <button onClick={onLogout} className="px-4 py-2 text-sm">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

const CandidateDashboard = () => {
  const [activePanel, setActivePanel] = useState('dashboard');

  // Candidate profile state – note phone field is removed.
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Removed phone field
    countryCode: '+1', // not used anymore
    mobileCountryCode: '+1',
    mobileNumber: '',
    whatsappSame: false,
    whatsappCountryCode: '+1',
    whatsappNumber: '',
    password: '',
    currentLocation: '',
    preferredLocation: '',
    // Now locationIdProof shows all states
    locationIdProof: '',
    // Documents for specific uploads:
    idProof: null,
    passport: null,
    visaCopy: null,
    // Profile photo to be shown in header
    profilePhoto: null
  });
  // Backup state to restore candidate info if canceled
  const [backupProfile, setBackupProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Submissions – add a dummy submission for demonstration
  const [submissions, setSubmissions] = useState([
    { id: 1, date: "2025-04-07", company: "ABC Inc", position: "Developer", location: "NY", status: "submitted", vendor: "Vendor X", rate: 50 }
  ]);
  // For inline editing of a submission row
  const [editingSubmissionId, setEditingSubmissionId] = useState(null);
  const [editingSubmissionData, setEditingSubmissionData] = useState({});

  // Analytics (unchanged demo data)
  const [analytics, setAnalytics] = useState({
    totalSubmissions: 0,
    interviewRate: 0,
    selectionRate: 0,
    marketingDays: 0,
    weeklySubmissions: [],
    monthlySubmissions: []
  });
  const [submissionFilter, setSubmissionFilter] = useState('all');
  const [submissionSort, setSubmissionSort] = useState('date');
  const [selectedTimeframe, setSelectedTimeframe] = useState('weekly');

  // Recruiter – set to null so that no recruiter is assigned by default
  const [recruiter, setRecruiter] = useState(null);

  useEffect(() => {
    // For analytics, create demo weekly and monthly data.
    const weeklyData = Array(12).fill().map((_, i) => ({
      name: `Week ${i+1}`,
      submissions: Math.floor(Math.random() * 8) + 1,
      interviews: Math.floor(Math.random() * 5)
    }));
    const monthlyData = Array(6).fill().map((_, i) => ({
      name: `Month ${i+1}`,
      submissions: Math.floor(Math.random() * 22) + 5,
      interviews: Math.floor(Math.random() * 12) + 2
    }));
    setAnalytics({
      totalSubmissions: weeklyData.reduce((sum, week) => sum + week.submissions, 0),
      interviewRate: 0,
      selectionRate: 0,
      marketingDays: 0,
      weeklySubmissions: weeklyData,
      monthlySubmissions: monthlyData
    });
  }, []);

  // When editing candidate info, save a backup copy so cancel can revert changes.
  const handleEditProfile = () => {
    setBackupProfile({ ...profile });
    setIsEditing(true);
  };

  const handleCancelProfileEdit = () => {
    if (backupProfile) {
      setProfile(backupProfile);
    }
    setIsEditing(false);
  };

  // Handle candidate input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    // If toggling the "whatsappSame" checkbox, update whatsappNumber accordingly
    if (name === 'whatsappSame') {
      setProfile((prev) => ({
        ...prev,
        whatsappSame: newValue,
        whatsappNumber: newValue ? prev.mobileNumber : prev.whatsappNumber
      }));
      return;
    }
    // If mobileNumber changes and whatsappSame is true, update whatsappNumber too.
    if (name === 'mobileNumber' && profile.whatsappSame) {
      setProfile((prev) => ({
        ...prev,
        mobileNumber: newValue,
        whatsappNumber: newValue
      }));
      return;
    }
    setProfile((prev) => ({ ...prev, [name]: newValue }));
  };

  // Handle file uploads for documents and profile photo
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const fileUrl = URL.createObjectURL(files[0]);
      setProfile((prev) => ({ ...prev, [name]: fileUrl }));
      // If this is the profile photo, update header automatically.
      if (name === 'profilePhoto') {
        // Header uses profile.profilePhoto so it updates automatically.
      }
    }
  };

  // Validate candidate form (only minimal validation is shown)
  const validateForm = () => {
    const newErrors = {};
    if (!profile.firstName) newErrors.firstName = 'First name is required';
    if (!profile.lastName) newErrors.lastName = 'Last name is required';
    if (!profile.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = 'Email is invalid';
    if (!profile.workAuthorization) newErrors.workAuthorization = 'Work authorization is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitProfile = () => {
    if (validateForm()) {
      setIsEditing(false);
      console.log('Profile saved:', profile);
    }
  };

  // Submission filtering and sorting functions
  const handleFilterChange = (e) => setSubmissionFilter(e.target.value);
  const handleSortChange = (e) => setSubmissionSort(e.target.value);

  const getFilteredSubmissions = () => {
    let filtered = [...submissions];
    if (submissionFilter !== 'all') {
      filtered = filtered.filter((sub) => sub.status === submissionFilter);
    }
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (submissionSort) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'company':
          comparison = a.company.localeCompare(b.company);
          break;
        case 'position':
          comparison = a.position.localeCompare(b.position);
          break;
        case 'rate':
          comparison = a.rate - b.rate;
          break;
        default:
          comparison = 0;
      }
      return -comparison;
    });
    return filtered;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return '⏳';
      case 'interview':
        return '📅';
      case 'feedback':
        return '🔍';
      case 'selected':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) return 'Hello Nightowl';
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Recruiter copy details function
  const copyRecruiterDetails = () => {
    if (recruiter) {
      const details = `Name: ${recruiter.name}\nEmail: ${recruiter.email}\nPhone: ${recruiter.phone}`;
      navigator.clipboard.writeText(details);
    }
  };

  // --- Functions for inline editing of submissions ---
  const handleSubmissionEdit = (submission) => {
    setEditingSubmissionId(submission.id);
    setEditingSubmissionData({ ...submission });
  };

  const handleSubmissionChange = (e) => {
    const { name, value } = e.target;
    setEditingSubmissionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmissionSave = () => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === editingSubmissionId ? editingSubmissionData : sub
      )
    );
    setEditingSubmissionId(null);
    setEditingSubmissionData({});
  };

  const handleSubmissionCancel = () => {
    setEditingSubmissionId(null);
    setEditingSubmissionData({});
  };

  // Options for work information dropdowns (unchanged)
  const authorizationOptions = [
    { value: '', label: 'Select work authorization *' },
    { value: 'USC', label: 'USC' },
    { value: 'L2', label: 'L2' },
    { value: 'H1B', label: 'H1-B' },
    { value: 'OPT', label: 'OPT/CPT' },
    { value: 'GC', label: 'GC' }
  ];
  const experienceLevels = [
    { value: '', label: 'Select experience level' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'expert', label: 'Expert Level (10+ years)' }
  ];
  const workModelOptions = [
    { value: '', label: 'Select preferred work model' },
    { value: 'onsite', label: 'On-site' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Header with profile symbol on the top right */}
      <Header profilePhoto={profile.profilePhoto} onLogout={() => alert("Logging out...")} />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-100 p-4">
          <div className="mb-8">
            <img src={Logo} alt="Company Logo" className="h-16 mx-auto" />
          </div>
          <nav>
            <ul className="space-y-4">
              <li
                onClick={() => setActivePanel('dashboard')}
                className={`cursor-pointer p-2 rounded ${activePanel === 'dashboard' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
              >
                Dashboard
              </li>
              <li
                onClick={() => setActivePanel('submissions')}
                className={`cursor-pointer p-2 rounded ${activePanel === 'submissions' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
              >
                Submissions
              </li>
              <li
                onClick={() => setActivePanel('recruiter')}
                className={`cursor-pointer p-2 rounded ${activePanel === 'recruiter' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
              >
                Recruiter Information
              </li>
              <li
                onClick={() => setActivePanel('candidate')}
                className={`cursor-pointer p-2 rounded ${activePanel === 'candidate' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
              >
                Candidate Information
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4">
          {activePanel === 'dashboard' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Submissions</p>
                  <p className="text-2xl font-bold">{analytics.totalSubmissions}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Interview Rate</p>
                  <p className="text-2xl font-bold">{analytics.interviewRate}%</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Selection Rate</p>
                  <p className="text-2xl font-bold">{analytics.selectionRate}%</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Marketing Days</p>
                  <p className="text-2xl font-bold">{analytics.marketingDays}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-bold">Submission Trends</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTimeframe('weekly')}
                    className={`px-3 py-1 text-sm rounded ${selectedTimeframe === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setSelectedTimeframe('monthly')}
                    className={`px-3 py-1 text-sm rounded ${selectedTimeframe === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={selectedTimeframe === 'weekly' ? analytics.weeklySubmissions : analytics.monthlySubmissions}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activePanel === 'submissions' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Submission History</h2>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div>
                    <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                    <select
                      id="statusFilter"
                      value={submissionFilter}
                      onChange={handleFilterChange}
                      className="w-full sm:w-40 border rounded p-2"
                    >
                      {[
                        { value: 'all', label: 'All Status' },
                        { value: 'submitted', label: 'Submitted ⏳' },
                        { value: 'interview', label: 'Interview Scheduled 📅' },
                        { value: 'feedback', label: 'Feedback Pending 🔍' },
                        { value: 'selected', label: 'Selected ✅' },
                        { value: 'rejected', label: 'Rejected ❌' }
                      ].map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                    <select
                      id="sortBy"
                      value={submissionSort}
                      onChange={handleSortChange}
                      className="w-full sm:w-40 border rounded p-2"
                    >
                      {[
                        { value: 'date', label: 'Submission Date' },
                        { value: 'company', label: 'Company' },
                        { value: 'position', label: 'Position' },
                        { value: 'rate', label: 'Rate' }
                      ].map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="text-gray-500 text-sm self-end">
                  {getFilteredSubmissions().length} submissions found
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getFilteredSubmissions().length > 0 ? (
                      getFilteredSubmissions().map((submission, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="p-3 whitespace-nowrap">{submission.date}</td>
                          <td className="p-3 whitespace-nowrap">
                            {editingSubmissionId === submission.id ? (
                              <input
                                type="text"
                                name="company"
                                value={editingSubmissionData.company || ''}
                                onChange={handleSubmissionChange}
                                className="border rounded p-1"
                              />
                            ) : (
                              submission.company
                            )}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            {editingSubmissionId === submission.id ? (
                              <input
                                type="text"
                                name="position"
                                value={editingSubmissionData.position || ''}
                                onChange={handleSubmissionChange}
                                className="border rounded p-1"
                              />
                            ) : (
                              submission.position
                            )}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            {editingSubmissionId === submission.id ? (
                              <input
                                type="text"
                                name="location"
                                value={editingSubmissionData.location || ''}
                                onChange={handleSubmissionChange}
                                className="border rounded p-1"
                              />
                            ) : (
                              submission.location
                            )}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                              {getStatusIcon(submission.status)} {submission.status}
                            </span>
                          </td>
                          <td className="p-3 whitespace-nowrap">{submission.vendor}</td>
                          <td className="p-3 whitespace-nowrap">
                            {editingSubmissionId === submission.id ? (
                              <input
                                type="number"
                                name="rate"
                                value={editingSubmissionData.rate || ''}
                                onChange={handleSubmissionChange}
                                className="border rounded p-1 w-16"
                              />
                            ) : (
                              `$${submission.rate}/hr`
                            )}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            {editingSubmissionId === submission.id ? (
                              <div className="flex space-x-2">
                                <button onClick={handleSubmissionSave} className="bg-green-500 text-white px-2 py-1 rounded text-xs">Save</button>
                                <button onClick={handleSubmissionCancel} className="bg-gray-500 text-white px-2 py-1 rounded text-xs">Cancel</button>
                              </div>
                            ) : (
                              <button onClick={() => handleSubmissionEdit(submission)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Edit</button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="p-3 text-center text-gray-500">No submission records found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activePanel === 'recruiter' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Recruiter Information</h2>
              {recruiter ? (
                <div className="space-y-4">
                  <p><strong>Name:</strong> {recruiter.name}</p>
                  <p><strong>Email:</strong> {recruiter.email}</p>
                  <p><strong>Phone:</strong> {recruiter.phone}</p>
                  <button
                    onClick={copyRecruiterDetails}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Copy Details
                  </button>
                </div>
              ) : (
                <p>no recruiter assigned yet</p>
              )}
            </div>
          )}

          {activePanel === 'candidate' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Personal Information</h2>
                {!isEditing ? (
                  <button 
                    onClick={handleEditProfile}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button 
                      onClick={handleSubmitProfile}
                      className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancelProfileEdit}
                      className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Details */}
                <div>
                  <h3 className="font-bold mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">First Name *</label>
                        {isEditing ? (
                          <>
                            <input
                              type="text"
                              name="firstName"
                              value={profile.firstName}
                              onChange={handleChange}
                              className={`w-full border rounded p-2 ${errors.firstName ? 'border-red-500' : ''}`}
                              placeholder="Enter first name"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                          </>
                        ) : (
                          <p>{profile.firstName || 'Not provided'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Last Name *</label>
                        {isEditing ? (
                          <>
                            <input
                              type="text"
                              name="lastName"
                              value={profile.lastName}
                              onChange={handleChange}
                              className={`w-full border rounded p-2 ${errors.lastName ? 'border-red-500' : ''}`}
                              placeholder="Enter last name"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                          </>
                        ) : (
                          <p>{profile.lastName || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Email Address *</label>
                      {isEditing ? (
                        <>
                          <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className={`w-full border rounded p-2 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="Enter email address"
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </>
                      ) : (
                        <p>{profile.email || 'Not provided'}</p>
                      )}
                    </div>
                    {/* Removed Phone Number field as per requirements */}
                    <div>
                      <label className="block text-gray-700 mb-1">Mobile Number *</label>
                      {isEditing ? (
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-1">
                            <select
                              name="mobileCountryCode"
                              value={profile.mobileCountryCode}
                              onChange={handleChange}
                              className="w-full border rounded p-2"
                            >
                              <option value="+1">USA (+1)</option>
                              <option value="+91">India (+91)</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <input
                              type="tel"
                              name="mobileNumber"
                              value={profile.mobileNumber}
                              onChange={handleChange}
                              maxLength="10"
                              className="w-full border rounded p-2"
                              placeholder="enter 10 digit mobile number"
                            />
                          </div>
                        </div>
                      ) : (
                        <p>{profile.mobileCountryCode} {profile.mobileNumber || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">WhatsApp Number *</label>
                      {isEditing ? (
                        <>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="whatsappSame"
                              checked={profile.whatsappSame}
                              onChange={handleChange}
                            />
                            <span>Same for WhatsApp</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                              <select
                                name="whatsappCountryCode"
                                value={profile.whatsappCountryCode}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                disabled={profile.whatsappSame}
                              >
                                <option value="+1">USA (+1)</option>
                                <option value="+91">India (+91)</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <input
                                type="tel"
                                name="whatsappNumber"
                                value={profile.whatsappNumber}
                                onChange={handleChange}
                                maxLength="10"
                                className="w-full border rounded p-2"
                                placeholder="enter 10 digit mobile number"
                                disabled={profile.whatsappSame}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <p>{profile.whatsappNumber || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Password *</label>
                      {isEditing ? (
                        <>
                          <input
                            type="password"
                            name="password"
                            value={profile.password}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            placeholder="Enter password"
                          />
                          <PasswordStrengthIndicator password={profile.password} />
                        </>
                      ) : (
                        <p>******</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Location Information */}
                <div>
                  <h3 className="font-bold mb-4">Location Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Current Location</label>
                      {isEditing ? (
                        <select
                          name="currentLocation"
                          value={profile.currentLocation}
                          onChange={handleChange}
                          className="w-full border rounded p-2"
                        >
                          {usStates.map((state, index) => (
                            <option key={index} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>{profile.currentLocation || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Preferred Location</label>
                      {isEditing ? (
                        <select
                          name="preferredLocation"
                          value={profile.preferredLocation}
                          onChange={handleChange}
                          className="w-full border rounded p-2"
                        >
                          {usStates.map((state, index) => (
                            <option key={index} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>{profile.preferredLocation || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Location ID Proof</label>
                      {isEditing ? (
                        <select
                          name="locationIdProof"
                          value={profile.locationIdProof}
                          onChange={handleChange}
                          className="w-full border rounded p-2"
                        >
                          {usStates.map((state, index) => (
                            <option key={index} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>{profile.locationIdProof || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Documents & Profile Photo Section */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-4">Documents</h3>
                  {isEditing && (
                    <>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">ID Proof</label>
                        <input
                          type="file"
                          name="idProof"
                          onChange={handleFileChange}
                          className="w-full border rounded p-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Passport</label>
                        <input
                          type="file"
                          name="passport"
                          onChange={handleFileChange}
                          className="w-full border rounded p-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Visa Copy</label>
                        <input
                          type="file"
                          name="visaCopy"
                          onChange={handleFileChange}
                          className="w-full border rounded p-2"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <h4 className="font-medium mb-2">Uploaded Documents</h4>
                    <ul className="space-y-2">
                      {profile.idProof && <li className="bg-gray-50 p-2 rounded">ID Proof Uploaded</li>}
                      {profile.passport && <li className="bg-gray-50 p-2 rounded">Passport Uploaded</li>}
                      {profile.visaCopy && <li className="bg-gray-50 p-2 rounded">Visa Copy Uploaded</li>}
                      {!(profile.idProof || profile.passport || profile.visaCopy) && (
                        <li className="text-gray-500">No documents uploaded</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Profile Photo</h3>
                  {isEditing && (
                    <div>
                      <input
                        type="file"
                        name="profilePhoto"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded"
                      />
                      <p className="text-sm text-gray-500 mt-1">Upload or change your profile photo</p>
                    </div>
                  )}
                  {!isEditing && (
                    <div>
                      {profile.profilePhoto ? (
                        <img src={profile.profilePhoto} alt="Profile" className="w-24 h-24 rounded-full" />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                          P
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CandidateDashboard;
