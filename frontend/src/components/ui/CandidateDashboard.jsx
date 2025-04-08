import React, { useState, useEffect, useRef } from 'react';
import Logo from "../../assets/VassInc_logo.png";
import {LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// State dropdown
const usStates = [
  { value: '', label: 'Select a state' },
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  { value: 'IL', label: 'Illinois' },
  { value: 'WA', label: 'Washington' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'MA', label: 'Massachusetts' }
];

// Authorization, Experience, Work Model
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

// Password strength
const PasswordStrengthIndicator = ({ password }) => {
  const hasUppercase = /[A-Z]/.test(password);
  const strength = password.length === 0 ? '' : hasUppercase ? 'Strong' : 'Weak';
  return (
    <p className="text-sm mt-1">
      {password.length > 0 && `Password Strength: ${strength}`}
    </p>
  );
};

// Header with outside click detection for logout dropdown
const Header = ({ profilePhoto, firstName, lastName, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const initials = (firstName && lastName)
    ? firstName[0].toUpperCase() + lastName[0].toUpperCase()
    : 'P';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="absolute top-0 right-0 p-4 z-50" ref={dropdownRef}>
      <div className="relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
        {profilePhoto ? (
          <img src={profilePhoto} alt="Profile" className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
            {initials}
          </div>
        )}
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
            <button
              onClick={onLogout}
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Component starts
const CandidateDashboard = () => {
  const [activePanel, setActivePanel] = useState('dashboard');

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    whatsappSame: false,
    whatsappNumber: '',
    password: '',
    currentLocation: '',
    preferredLocation: '',
    locationIdProof: '',
    workAuthorization: '',
    experienceLevel: '',
    workModel: '',
    documents: [],
    profilePhoto: null
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const [backupProfile, setBackupProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleEditProfile = () => {
    setBackupProfile({ ...profile });
    setIsEditing(true);
  };

  const handleCancelProfileEdit = () => {
    if (backupProfile) {
      setProfile(backupProfile);
    }
    setIsEditing(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle mobile number and WhatsApp number with 10-digit limit
    if (name === 'mobileNumber' || name === 'whatsappNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      
      if (name === 'mobileNumber' && profile.whatsappSame) {
        setProfile((prev) => ({
          ...prev,
          mobileNumber: numericValue,
          whatsappNumber: numericValue
        }));
      } else {
        setProfile((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else if (name === 'whatsappSame') {
      setProfile((prev) => ({
        ...prev,
        whatsappSame: checked,
        whatsappNumber: checked ? prev.mobileNumber : prev.whatsappNumber
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'documents') {
      const newFiles = Array.from(files);
      setProfile((prev) => ({
        ...prev,
        documents: [...prev.documents, ...newFiles.map(file => URL.createObjectURL(file))]
      }));
    } else if (name === 'profilePhoto' && files[0]) {
      const fileUrl = URL.createObjectURL(files[0]);
      setProfile((prev) => ({ ...prev, profilePhoto: fileUrl }));
    }
  };

  const handleDeleteProfilePhoto = () => {
    setProfile((prev) => ({ ...prev, profilePhoto: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!profile.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!profile.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = 'Invalid email';
    if (!profile.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    if (!profile.whatsappNumber.trim()) newErrors.whatsappNumber = 'WhatsApp number is required';
    if (!profile.workAuthorization.trim()) newErrors.workAuthorization = 'Work authorization is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordData.oldPassword) newErrors.oldPassword = 'Old password is required';
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
    if (!passwordData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitProfile = () => {
    if (validateForm()) {
      setIsEditing(false);
      setErrors({});
      console.log('Profile submitted:', profile);
    }
  };

  const handleSubmitPassword = () => {
    if (validatePasswordForm()) {
      console.log('Password change submitted:', passwordData);
      setChangingPassword(false);
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordErrors({});
    }
  };

  const renderError = (field) =>
    errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>;

  const renderPasswordError = (field) =>
    passwordErrors[field] && <p className="text-red-500 text-sm mt-1">{passwordErrors[field]}</p>;

  const renderPasswordChangeSection = () => (
    <div className="mt-6 p-4 border rounded-md bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Old Password *</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            className="w-full border rounded p-2"
          />
          {renderPasswordError('oldPassword')}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">New Password *</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="w-full border rounded p-2"
          />
          {renderPasswordError('newPassword')}
          <PasswordStrengthIndicator password={passwordData.newPassword} />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="w-full border rounded p-2"
          />
          {renderPasswordError('confirmPassword')}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setChangingPassword(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitPassword}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="bg-white rounded-lg shadow p-6 border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Candidate Profile</h2>
        {!isEditing ? (
          <div className="space-x-2">
            <button
              onClick={() => setChangingPassword(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Change Password
            </button>
            <button
              onClick={handleEditProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleSubmitProfile}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelProfileEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Password Change Section */}
      {changingPassword && renderPasswordChangeSection()}

      {/* Profile Photo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Profile Photo</h3>
        <div className="flex items-center gap-4">
          {profile.profilePhoto ? (
            <img
              src={profile.profilePhoto}
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
              {profile.firstName && profile.lastName
                ? profile.firstName[0].toUpperCase() + profile.lastName[0].toUpperCase()
                : 'P'}
            </div>
          )}
          {isEditing && (
            <div className="flex flex-col gap-2">
              <label className="text-blue-600 hover:underline cursor-pointer">
                Change Photo
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {profile.profilePhoto && (
                <button
                  onClick={handleDeleteProfilePhoto}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete Photo
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['firstName', 'lastName'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-semibold mb-1 capitalize">
              {field.replace(/([A-Z])/g, ' $1')} *
            </label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder={`Enter ${field}`}
                />
                {renderError(field)}
              </>
            ) : (
              <p className="text-gray-800">{profile[field] || 'Not provided'}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email *</label>
          {isEditing ? (
            <>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Enter email"
              />
              {renderError('email')}
            </>
          ) : (
            <p className="text-gray-800">{profile.email || 'Not provided'}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Mobile Number * (10 digits)</label>
          {isEditing ? (
            <>
              <input
                type="text"
                name="mobileNumber"
                value={profile.mobileNumber}
                onChange={handleChange}
                className="w-full border rounded p-2"
                maxLength="10"
                placeholder="Enter 10-digit mobile number"
              />
              {renderError('mobileNumber')}
            </>
          ) : (
            <p className="text-gray-800">{profile.mobileNumber || 'Not provided'}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">WhatsApp Number * (10 digits)</label>
          {isEditing ? (
            <>
              <div className="flex items-center mb-2 gap-2">
                <input
                  type="checkbox"
                  name="whatsappSame"
                  checked={profile.whatsappSame}
                  onChange={handleChange}
                />
                <span className="text-sm">Same as mobile</span>
              </div>
              <input
                type="text"
                name="whatsappNumber"
                value={profile.whatsappNumber}
                onChange={handleChange}
                className="w-full border rounded p-2"
                maxLength="10"
                disabled={profile.whatsappSame}
                placeholder="Enter 10-digit WhatsApp number"
              />
              {renderError('whatsappNumber')}
            </>
          ) : (
            <p className="text-gray-800">{profile.whatsappNumber || 'Not provided'}</p>
          )}
        </div>
      </div>

      {/* Work Authorization, Experience Level, Work Model */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Work Authorization *</label>
          {isEditing ? (
            <>
              <select
                name="workAuthorization"
                value={profile.workAuthorization}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                {authorizationOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {renderError('workAuthorization')}
            </>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-gray-800">{profile.workAuthorization || 'Not provided'}</p>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
              >
                Change
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Experience Level</label>
          {isEditing ? (
            <select
              name="experienceLevel"
              value={profile.experienceLevel}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              {experienceLevels.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <p className="text-gray-800">{profile.experienceLevel || 'Not provided'}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Preferred Work Model</label>
          {isEditing ? (
            <select
              name="workModel"
              value={profile.workModel}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              {workModelOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <p className="text-gray-800">{profile.workModel || 'Not provided'}</p>
          )}
        </div>
      </div>

      {/* Document Upload */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Documents (ID proof, Passport, Visa, etc.)</h3>
        {isEditing && (
          <input
            type="file"
            name="documents"
            multiple
            onChange={handleFileChange}
            className="w-full border rounded p-2"
          />
        )}
        <ul className="mt-2 space-y-1">
          {profile.documents.length > 0 ? (
            profile.documents.map((doc, idx) => (
              <li key={idx} className="text-blue-700 text-sm hover:underline">{`Document ${idx + 1}`}</li>
            ))
          ) : (
            <li className="text-gray-500 text-sm">No documents uploaded</li>
          )}
        </ul>
      </div>
    </div>
  );
  
  // Mock submissions data based on the screenshot
  const [submissions, setSubmissions] = useState([
    {
      date: '2025-04-07',
      company: 'ABC Inc',
      position: 'Developer',
      location: 'NY',
      status: 'submitted',
      vendor: 'Vendor X',
      rate: '$50/hr'
    }
  ]);
  
  const [submissionFilter, setSubmissionFilter] = useState('all');
  const [submissionSort, setSubmissionSort] = useState('date');
  const [selectedTimeframe, setSelectedTimeframe] = useState('weekly');
  const [analytics, setAnalytics] = useState({
    totalSubmissions: 0,
    interviewRate: 0,
    selectionRate: 0,
    marketingDays: 0,
    weeklySubmissions: [],
    monthlySubmissions: []
  });

  useEffect(() => {
    const weeklyData = Array(6).fill().map((_, i) => ({
      name: `Week ${i + 1}`,
      submissions: Math.floor(Math.random() * 10),
      interviews: Math.floor(Math.random() * 5)
    }));
    const monthlyData = Array(3).fill().map((_, i) => ({
      name: `Month ${i + 1}`,
      submissions: Math.floor(Math.random() * 20),
      interviews: Math.floor(Math.random() * 10)
    }));
    setAnalytics({
      totalSubmissions: weeklyData.reduce((sum, w) => sum + w.submissions, 0),
      interviewRate: 33,
      selectionRate: 15,
      marketingDays: 12,
      weeklySubmissions: weeklyData,
      monthlySubmissions: monthlyData
    });
  }, []);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return <span title="Submitted">⏳</span>;
      case 'interview':
        return <span title="Interview Scheduled">📅</span>;
      case 'pending':
        return <span title="Feedback Pending">🔍</span>;
      case 'selected':
        return <span title="Selected">✅</span>;
      case 'rejected':
        return <span title="Rejected">❌</span>;
      default:
        return null;
    }
  };

  const renderDashboard = () => (
    <div className="bg-white rounded-lg shadow p-6 border">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Dashboard Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="text-center bg-blue-100 p-4 rounded">
          <p className="text-sm text-gray-600">Total Submissions</p>
          <p className="text-xl font-bold">{analytics.totalSubmissions}</p>
        </div>
        <div className="text-center bg-green-100 p-4 rounded">
          <p className="text-sm text-gray-600">Interview Rate</p>
          <p className="text-xl font-bold">{analytics.interviewRate}%</p>
        </div>
        <div className="text-center bg-purple-100 p-4 rounded">
          <p className="text-sm text-gray-600">Selection Rate</p>
          <p className="text-xl font-bold">{analytics.selectionRate}%</p>
        </div>
        <div className="text-center bg-yellow-100 p-4 rounded">
          <p className="text-sm text-gray-600">Marketing Days</p>
          <p className="text-xl font-bold">{analytics.marketingDays}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Submission Trends</h3>
        <div className="space-x-2">
          <button
            onClick={() => setSelectedTimeframe('weekly')}
            className={`px-3 py-1 text-sm rounded ${selectedTimeframe === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setSelectedTimeframe('monthly')}
            className={`px-3 py-1 text-sm rounded ${selectedTimeframe === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={selectedTimeframe === 'weekly' ? analytics.weeklySubmissions : analytics.monthlySubmissions}
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
  );

  const renderSubmissions = () => (
    <div className="bg-white rounded-lg shadow p-6 border">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Submission History</h2>
      
      <div className="flex flex-wrap justify-between mb-4">
        <div className="mb-2">
          <label className="mr-2 text-gray-700">Filter by Status:</label>
          <select 
            value={submissionFilter} 
            onChange={(e) => setSubmissionFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="interview">Interview Scheduled</option>
            <option value="pending">Feedback Pending</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div>
          <label className="mr-2 text-gray-700">Sort by:</label>
          <select 
            value={submissionSort} 
            onChange={(e) => setSubmissionSort(e.target.value)}
            className="border rounded p-2"
          >
            <option value="date">Submission Date</option>
            <option value="company">Company</option>
            <option value="position">Position</option>
          </select>
        </div>
      </div>
      
      <div className="mb-2 text-right text-gray-700">
        {submissions.length} submissions found
      </div>
      
      {submissions.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-12">No submissions yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">DATE</th>
                <th className="p-2 border">COMPANY</th>
                <th className="p-2 border">POSITION</th>
                <th className="p-2 border">LOCATION</th>
                <th className="p-2 border">STATUS</th>
                <th className="p-2 border">VENDOR</th>
                <th className="p-2 border">RATE</th>
                <th className="p-2 border">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{sub.date}</td>
                  <td className="p-2 border">{sub.company}</td>
                  <td className="p-2 border">{sub.position}</td>
                  <td className="p-2 border">{sub.location}</td>
                  <td className="p-2 border">
                    <span className="flex items-center">
                      {renderStatusIcon(sub.status)} 
                      <span className="ml-1">{sub.status}</span>
                    </span>
                  </td>
                  <td className="p-2 border">{sub.vendor}</td>
                  <td className="p-2 border">{sub.rate}</td>
                  <td className="p-2 border">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  
  const [recruiter, setRecruiter] = useState(null); // Optional for recruiter panel

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <Header
        profilePhoto={profile.profilePhoto}
        firstName={profile.firstName}
        lastName={profile.lastName}
        onLogout={() => alert("Logging out...")}
      />

      {/* Layout */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white shadow-lg border-r p-6">
          <div className="mb-10">
            <img src={Logo} alt="Company Logo" className="h-14 mx-auto" />
          </div>
          <ul className="space-y-3 text-sm">
            <li
              onClick={() => setActivePanel('dashboard')}
              className={`cursor-pointer px-4 py-2 rounded transition ${
                activePanel === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-100 text-gray-700'
              }`}
            >
              Dashboard
            </li>
            <li
              onClick={() => setActivePanel('submissions')}
              className={`cursor-pointer px-4 py-2 rounded transition ${
                activePanel === 'submissions'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-100 text-gray-700'
              }`}
            >
              Submissions
            </li>
            <li
              onClick={() => setActivePanel('recruiter')}
              className={`cursor-pointer px-4 py-2 rounded transition ${
                activePanel === 'recruiter'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-100 text-gray-700'
              }`}
            >
              Recruiter Info
            </li>
            <li
              onClick={() => setActivePanel('candidate')}
              className={`cursor-pointer px-4 py-2 rounded transition ${
                activePanel === 'candidate'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-100 text-gray-700'
              }`}
            >
              Candidate Profile
            </li>
          </ul>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-6 space-y-6">
          {activePanel === 'dashboard' && renderDashboard()}
          {activePanel === 'submissions' && renderSubmissions()}
          {activePanel === 'candidate' && renderProfileSection()}
          {activePanel === 'recruiter' && (
            <div className="bg-white p-6 shadow rounded border">
              <h2 className="text-xl font-bold text-blue-700 mb-4">Recruiter Information</h2>
              {recruiter ? (
                <div>
                  <p><strong>Name:</strong> {recruiter.name}</p>
                  <p><strong>Email:</strong> {recruiter.email}</p>
                  <p><strong>Phone:</strong> {recruiter.phone}</p>
                </div>
              ) : (
                <p className="text-gray-500">No recruiter assigned yet</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CandidateDashboard;