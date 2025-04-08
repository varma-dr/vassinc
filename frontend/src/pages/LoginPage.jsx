import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Logo from "../assets/VassInc_logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Set the page title dynamically
  useEffect(() => {
    document.title = "VASS INC - Login";
    
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }

    // Clear general login error when user types
    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
    }
    
    // Validate user type
    if (!formData.userType) {
      newErrors.userType = "Please select a user type";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      setLoginError("");
      
      try {
        // Make API call to login endpoint
        const response = await axios.post('http://localhost:5005/api/auth/login', {
          email: formData.email,
          password: formData.password,
          userType: formData.userType
        });
        
        // Store token in localStorage (or sessionStorage if remember me is not checked)
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', response.data.token);
        
        // Store user type for future reference
        storage.setItem('userType', formData.userType);
        
        // If successful login
        console.log('Login successful', response.data);
        
        // Check user type and redirect accordingly
        if (response.data.userType === 'standard') {
          // If user hasn't completed profile, redirect to user type selection
          navigate('/UserTypeSelector');
        } else {
          // If user has completed profile, redirect to dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Login error:', error);
        
        if (error.response) {
          // Server responded with an error
          if (error.response.status === 400) {
            // Authentication error (wrong credentials)
            setLoginError(error.response.data.msg || "Invalid email or password");
          } else if (error.response.status === 404) {
            // User not found
            setLoginError("Account not found. Please sign up.");
          } else {
            // Other server errors
            setLoginError("Login failed. Please try again later.");
          }
        } else if (error.request) {
          // No response from server
          setLoginError("Server not responding. Please try again later.");
        } else {
          // Other errors
          setLoginError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-indigo-200 bg-subtle-texture">
      {/* Subtle Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>
      
      {/* Glassmorphism Card */}
      <div className="relative z-10 bg-white bg-opacity-60 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-md-elegant text-gray-800 w-full max-w-md border border-gray-300">
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="VASS INC Logo"
            className="mx-auto w-48 h-32 mb-4 drop-shadow-md"
            onError={(e) => console.error("Logo failed to load:", e)}
          />
        </div>
        
        <h2 className="text-xl font-medium text-center mb-6 text-gray-600 text-2xl">Login</h2>
        
        {/* Error message */}
        {loginError && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center justify-center">
            <span>{loginError}</span>
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2.5 rounded-md border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-teal-500"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          
          {/* User Type Dropdown */}
          <div className="relative">
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className={`w-full pl-4 pr-4 py-2.5 rounded-md border ${
                errors.userType ? "border-red-500" : "border-gray-300"
              } bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700`}
            >
              <option value="">Select User Type</option>
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            {errors.userType && (
              <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
            )}
          </div>
          
          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="rememberMe" className="ml-2 text-gray-600">
                Remember me
              </label>
            </div>
            
            {/* Forgot Password */}
            <div className="text-sm">
              <a href="/forgot-password" className="text-teal-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          
          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-md shadow-md-elegant focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          {/* Sign Up Link */}
          <div className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-teal-600 hover:underline font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;