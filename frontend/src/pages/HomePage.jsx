import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import Logo from "../assets/VassInc_logo.png";  


const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [userType, setUserType] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Set the page title dynamically
  useEffect(() => {
    document.title = "VASS INC - Login";
  }, []);

  // Email validation function
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password strength validation function
  const validatePasswordStrength = (password) => {
    return /[A-Z]/.test(password) ? "Strong" : "Weak";
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (validatePasswordStrength(password) === "Weak") {
      setPasswordError("Password must contain at least one uppercase letter.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      setIsLoggedIn(true);
      console.log("Login Successful", { email, password });
    }
  
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-400">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-lg text-white w-full max-w-md">
        
        {/* VASS INC Branding */}
        <div className="text-center mb-4">
          {/* Display Logo */}
          <img 
            src={Logo} 
            alt="VASS INC Logo" 
            className="mx-auto w-56 h-40 mb-2 drop-shadow-lg"
            onError={(e) => console.error("Logo failed to load:", e)} 
          />
        </div>
        <h1 className="text-4xl font-extrabold text-center mb-1 text-yellow-300">
          VASS INC
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Welcome Message */}
        {isLoggedIn && (
          <div className="text-center mb-8 text-yellow-300">
            <h3>Welcome!!</h3>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div className="relative">
            <FaUser className="absolute left-4 top-4 text-yellow-300" />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required 
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-yellow-300" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required 
            />
            <button 
              type="button"
              className="absolute right-4 top-4 text-yellow-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && <p className="text-red-400 mt-1">{passwordError}</p>}
          </div>

          {/* User Type Dropdown */}
          <div className="relative">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full pl-4 pr-4 py-3 rounded-lg bg-indigo-100 text-indigo-900 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="" disabled>Select User Type</option>
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-300">Remember me</label>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-yellow-400 text-indigo-900 font-bold py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-300">
          Don't have an account? 
          <Link to="/register" className="text-yellow-300 hover:underline ml-2">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;