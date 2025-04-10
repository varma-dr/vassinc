import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Logo from "../assets/VassInc_logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "", // Will handle both email and phone
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Phone validation regex (basic international format)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  // Set the page title dynamically
  useEffect(() => {
    document.title = "VASS INC - Login";
    
    // Check if user is already logged in but don't automatically redirect
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      setIsAlreadyLoggedIn(true);
    }
  }, []);

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

  const identifierType = (identifier) => {
    if (emailRegex.test(identifier)) return "email";
    if (phoneRegex.test(identifier)) return "phone";
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate identifier (email or phone)
    if (!formData.identifier) {
      newErrors.identifier = "Email or phone number is required";
    } else {
      const type = identifierType(formData.identifier);
      if (!type) {
        newErrors.identifier = "Please enter a valid email or phone number";
      }
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userType');
    localStorage.removeItem('userType');
    setIsAlreadyLoggedIn(false);
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      setLoginError("");
      
      try {
        // Create the payload with the email field for backward compatibility
        // The backend is still expecting 'email' even for phone numbers
        const payload = {
          email: formData.identifier, // Use the identifier as email for now
          password: formData.password
        };
        
        // Make API call to login endpoint
        const response = await axios.post('http://localhost:5005/api/auth/login', payload);
        
        // Store token in localStorage (or sessionStorage if remember me is not checked)
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', response.data.token);
        
        // Store user type from the response
        storage.setItem('userType', response.data.userType);
        
        // If successful login
        console.log('Login successful', response.data);
        setIsAlreadyLoggedIn(true);
        
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
            setLoginError(error.response.data.msg || "Invalid credentials");
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
        
        {/* Already logged in message */}
        {isAlreadyLoggedIn ? (
          <div className="mb-8">
            <div className="p-4 bg-teal-50 border border-teal-400 text-teal-800 rounded text-center mb-4">
              <p className="font-medium">You are already logged in!</p>
              <p className="text-sm mt-1">Would you like to continue to your dashboard or log out?</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleContinueToDashboard}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-md shadow-md"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-md shadow-md"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Error message */}
            {loginError && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center justify-center">
                <span>{loginError}</span>
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Identifier Field (Email or Phone) */}
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="identifier"
                  placeholder="Email or Phone Number"
                  value={formData.identifier}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-md border ${
                    errors.identifier ? "border-red-500" : "border-gray-300"
                  } bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700`}
                  required
                />
                {errors.identifier && (
                  <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;