import React, { useState, useEffect } from 'react';
import Logo from "../../assets/VassInc_logo.png";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CandidateDashboard = () => {
  
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentLocation: '',
    preferredLocation: '',
    driversLicense: '',
    workAuthorization: '',
    experienceLevel: '',
    preferredWorkModel: '',
    documents: []
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [submissions, setSubmissions] = useState([]);
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
  
  // Mock data for analytics - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call to get submissions data
    const mockSubmissions = [
      // This would be populated from an API in a real application
    ];
    
    // Calculate analytics based on submissions
    const today = new Date();
    const weeklyData = Array(12).fill().map((_, i) => ({
      name: `Week ${i+1}`,
      submissions: Math.floor(Math.random() * 8) + 1,
      interviews: Math.floor(Math.random() * 5),
    }));
    
    const monthlyData = Array(6).fill().map((_, i) => ({
      name: `Month ${i+1}`,
      submissions: Math.floor(Math.random() * 22) + 5,
      interviews: Math.floor(Math.random() * 12) + 2,
    }));
    
    setSubmissions(mockSubmissions);
    setAnalytics({
      totalSubmissions: weeklyData.reduce((sum, week) => sum + week.submissions, 0),
      interviewRate: 0, // Percentage
      selectionRate: 0, // Percentage
      marketingDays: 0, // Days from account creation to first job
      weeklySubmissions: weeklyData,
      monthlySubmissions: monthlyData
    });
  }, []);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) return 'Hello Nightowl';
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };
  
  const handleDocumentUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setProfile({
      ...profile,
      documents: [...profile.documents, ...newFiles]
    });
  };
  
  const handleRemoveDocument = (index) => {
    const updatedDocs = [...profile.documents];
    updatedDocs.splice(index, 1);
    setProfile({
      ...profile,
      documents: updatedDocs
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Make first name mandatory
    if (!profile.firstName) newErrors.firstName = 'First name is required';
    
    // Make last name mandatory
    if (!profile.lastName) newErrors.lastName = 'Last name is required';
    
    // Email validation
    if (!profile.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = 'Email is invalid';
    
    // Phone validation
    if (!profile.phone) newErrors.phone = 'Phone number is required';
    
    // Work authorization validation
    if (!profile.workAuthorization) newErrors.workAuthorization = 'Work authorization is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      setIsEditing(false);
      console.log('Profile saved:', profile);
    }
  };
  
  const handleFilterChange = (e) => {
    setSubmissionFilter(e.target.value);
  };
  
  const handleSortChange = (e) => {
    setSubmissionSort(e.target.value);
  };
  
  const getFilteredSubmissions = () => {
    let filtered = [...submissions];
    
    if (submissionFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === submissionFilter);
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
      
      return -comparison; // Default to descending
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
  
  // Work authorization options
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
  
  const locationOptions = [
    { value: '', label: 'Select preferred location' },
    { value: 'New York, NY', label: 'New York, NY' },
    { value: 'San Francisco, CA', label: 'San Francisco, CA' },
    { value: 'Austin, TX', label: 'Austin, TX' },
    { value: 'Chicago, IL', label: 'Chicago, IL' },
    { value: 'Seattle, WA', label: 'Seattle, WA' },
    { value: 'Boston, MA', label: 'Boston, MA' },
    { value: 'Los Angeles, CA', label: 'Los Angeles, CA' },
    { value: 'Denver, CO', label: 'Denver, CO' }
  ];
  
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'interview', label: 'Interview Scheduled' },
    { value: 'feedback', label: 'Feedback Pending' },
    { value: 'selected', label: 'Selected' },
    { value: 'rejected', label: 'Rejected' }
  ];
  
  const sortOptions = [
    { value: 'date', label: 'Submission Date' },
    { value: 'company', label: 'Company' },
    { value: 'position', label: 'Position' },
    { value: 'rate', label: 'Rate' }
  ];
  
  return (
    <div className="candidate-dashboard bg-blue-30 min-h-screen">
      {/* Header - reduced size */}
      <header className="bg-blue-300 text-white shadow-md py-3">
        <div className="container mx-auto">
          <div className="flex items-center">
            <img src={Logo} alt="Company Logo" className="h-16 mr-2" />
            <h1 className="text-lg font-bold"></h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Greeting */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{getGreeting()}, {profile.firstName || 'Candidate'}</h2>
        </div>
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-2">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Personal Information</h2>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button 
                      onClick={handleSubmit}
                      className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
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
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Phone Number *</label>
                      {isEditing ? (
                        <>
                          <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className={`w-full border rounded p-2 ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="Enter phone number"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </>
                      ) : (
                        <p>{profile.phone || 'Not provided'}</p>
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
                        <input
                          type="text"
                          name="currentLocation"
                          value={profile.currentLocation}
                          onChange={handleChange}
                          className="w-full border rounded p-2"
                          placeholder="Enter current location"
                        />
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
                          {locationOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : (
                        <p>
                          {locationOptions.find(o => o.value === profile.preferredLocation)?.label || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-4">Work Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Work Authorization *</label>
                      {isEditing ? (
                        <>
                          <select
                            name="workAuthorization"
                            value={profile.workAuthorization}
                            onChange={handleChange}
                            className={`w-full border rounded p-2 ${errors.workAuthorization ? 'border-red-500' : ''}`}
                          >
                            {authorizationOptions.map((option, index) => (
                              <option key={index} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          {errors.workAuthorization && <p className="text-red-500 text-sm mt-1">{errors.workAuthorization}</p>}
                        </>
                      ) : (
                        <p>
                          {authorizationOptions.find(o => o.value === profile.workAuthorization)?.label || 'Not provided'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Experience Level</label>
                      {isEditing ? (
                        <select
                          name="experienceLevel"
                          value={profile.experienceLevel}
                          onChange={handleChange}
                          className="w-full border rounded p-2"
                        >
                          {experienceLevels.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : (
                        <p>
                          {experienceLevels.find(o => o.value === profile.experienceLevel)?.label || 'Not provided'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Preferred Work Model</label>
                      {isEditing ? (
                        <select
                          name="preferredWorkModel"
                          value={profile.preferredWorkModel}
                          onChange={handleChange}
                          className="w-full border rounded p-2"
                        >
                          {workModelOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : (
                        <p>
                          {workModelOptions.find(o => o.value === profile.preferredWorkModel)?.label || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-4">Documents</h3>
                  {isEditing ? (
                    <div>
                      <input
                        type="file"
                        multiple
                        onChange={handleDocumentUpload}
                        className="w-full border p-2 rounded"
                      />
                      <p className="text-sm text-gray-500 mt-1">Upload resumes, certifications, or other documents</p>
                    </div>
                  ) : null}
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Uploaded Documents</h4>
                    {profile.documents.length > 0 ? (
                      <ul className="space-y-2">
                        {profile.documents.map((doc, index) => (
                          <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span>{doc.name}</span>
                            {isEditing && (
                              <button 
                                onClick={() => handleRemoveDocument(index)}
                                className="text-red-500"
                              >
                                Remove
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No documents uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submission History */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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
                      {statusOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
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
                      {sortOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getFilteredSubmissions().length > 0 ? (
                      getFilteredSubmissions().map((submission, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="p-3 whitespace-nowrap">{submission.date}</td>
                          <td className="p-3">{submission.company}</td>
                          <td className="p-3">{submission.position}</td>
                          <td className="p-3">{submission.location}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                              {getStatusIcon(submission.status)} {' '}
                              {statusOptions.find(o => o.value === submission.status)?.label.replace(' ', '\u00A0')}
                            </span>
                          </td>
                          <td className="p-3">{submission.vendor}</td>
                          <td className="p-3">${submission.rate}/hr</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="p-3 text-center text-gray-500">No submission records found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Right Column - Analytics */}
          <div className="lg:col-span-1">
            {/* Analytics Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
              
              {/* Key Metrics */}
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
              
              {/* Submission Trends Graph */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Submission Trends</h3>
                  <div className="flex space-x-2">
                    <button 
                      className={`px-3 py-1 text-sm rounded ${selectedTimeframe === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => setSelectedTimeframe('weekly')}
                    >
                      Weekly
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm rounded ${selectedTimeframe === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => setSelectedTimeframe('monthly')}
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
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2025 Talent Connect. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default CandidateDashboard;