import React, { useState, useEffect } from 'react';

// Candidate Page Component
const CandidatePage = () => {
  // State for user profile data
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentLocation: '',
    preferredLocations: [],
    driversLicense: '',
    workAuthorization: '',
    experienceLevel: '',
    preferredWorkModel: '',
    documents: []
  });
  
  
  const [isEditing, setIsEditing] = useState(false);
  
  
  const [errors, setErrors] = useState({});
  
  
  const [recruiter, setRecruiter] = useState({
  });
  
  
  const [submissions, setSubmissions] = useState([]);
  
  
  const [submissionFilter, setSubmissionFilter] = useState('all');
  const [submissionSort, setSubmissionSort] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) return 'Hey night owl';
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };
  
  const handleLocationChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setProfile({
      ...profile,
      preferredLocations: value
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
    
    if (!profile.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = 'Email is invalid';
    
    if (!profile.phone) newErrors.phone = 'Phone number is required';
    
    
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
    const newSort = e.target.value;
    if (submissionSort === newSort) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSubmissionSort(newSort);
      setSortDirection('desc');
    }
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
      
      return sortDirection === 'asc' ? comparison : -comparison;
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
    { value: '', label: 'Select work authorization' },
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
    'New York, NY',
    'San Francisco, CA',
    'Austin, TX',
    'Chicago, IL',
    'Seattle, WA',
    'Boston, MA',
    'Los Angeles, CA',
    'Denver, CO'
  ];
  

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
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
    <div className="candidate-page">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/api/placeholder/50/50" alt="Company Logo" className="mr-4" />
            <h1 className="text-xl font-bold">Recruitment Portal</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline">Dashboard</a></li>
              <li><a href="#" className="hover:underline">Jobs</a></li>
              <li><a href="#" className="hover:underline">Messages</a></li>
              <li><a href="#" className="hover:underline">Profile</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Greeting & Recruiter Info */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold">{getGreeting()}, {profile.firstName || 'Candidate'}</h2>
            <p className="text-gray-600">Welcome to your candidate portal</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold">Your Assigned Recruiter</h3>
            <div className="flex items-center mt-2">
              
              <div>
                <p className="font-medium">{recruiter.name}</p>
                <p className="text-sm">{recruiter.email}</p>
                <p className="text-sm">{recruiter.phone}</p>
              </div>
            </div>
          </div>
        </div>
        
        
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
                    <label className="block text-gray-700 mb-1">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Enter first name"
                      />
                    ) : (
                      <p>{profile.firstName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Enter last name"
                      />
                    ) : (
                      <p>{profile.lastName || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Email Address</label>
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
                  <label className="block text-gray-700 mb-1">Phone Number</label>
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
                    <>
                      <input
                        type="text"
                        name="currentLocation"
                        value={profile.currentLocation}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${errors.currentLocation ? 'border-red-500' : ''}`}
                        placeholder="Enter current location"
                      />
                      {errors.currentLocation && <p className="text-red-500 text-sm mt-1">{errors.currentLocation}</p>}
                    </>
                  ) : (
                    <p>{profile.currentLocation || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Preferred Locations</label>
                  {isEditing ? (
                    <select
                      name="preferredLocations"
                      multiple
                      value={profile.preferredLocations}
                      onChange={handleLocationChange}
                      className="w-full border rounded p-2 h-32"
                    >
                      {locationOptions.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  ) : (
                    <p>{profile.preferredLocations.length > 0 ? profile.preferredLocations.join(', ') : 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Driver's License Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="driversLicense"
                      value={profile.driversLicense}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                      placeholder="Enter driver's license state/country"
                    />
                  ) : (
                    <p>{profile.driversLicense || 'Not provided'}</p>
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
                  <label className="block text-gray-700 mb-1">Work Authorization</label>
                  {isEditing ? (
                    <select
                      name="workAuthorization"
                      value={profile.workAuthorization}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    >
                      {authorizationOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
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
              
              <div className="self-end">
                <button
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  className="flex items-center border rounded p-2 bg-gray-50 hover:bg-gray-100"
                >
                  {sortDirection === 'asc' ? '↑ Ascending' : '↓ Descending'}
                </button>
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
      </main>
      
      
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2025 Recruitment Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CandidatePage;