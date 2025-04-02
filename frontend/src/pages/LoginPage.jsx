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
  const [userType, setUserType] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Set the page title dynamically
  useEffect(() => {
    document.title = "VASS INC - Login";
  }, []);

  // Email validation function
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password strength validation function (simplified for classic look)
  const validatePasswordStrength = (password) => {
    return password.length >= 6 ? "Strong" : "Weak";
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
      setPasswordError("Password should be at least 6 characters long.");
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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-indigo-200 bg-subtle-texture">
      {/* Subtle Dark Overlay (optional, can be adjusted) */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>

      {/* Glassmorphism Card with Elegant Darker Colors - More Curved Edges and Border */}
      <div className="relative z-10 bg-white bg-opacity-60 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-md-elegant text-gray-800 w-full max-w-md border border-gray-300">

        {/* VASS INC Branding */}
        <div className="text-center mb-4">
          {/* Display Logo */}
          <img
            src={Logo}
            alt="VASS INC Logo"
            className="mx-auto w-48 h-32 mb-4 drop-shadow-md"
            onError={(e) => console.error("Logo failed to load:", e)}
          />
        </div>
        <h2 className="text-xl font-medium text-center mb-6 text-gray-600 text-2xl">Login</h2>

        {/* Welcome Message */}
        {isLoggedIn && (
          <div className="text-center mb-8 text-green-600">
            <h3>Welcome!</h3>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-teal-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* User Type Dropdown */}
          <div className="relative">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full pl-3 pr-4 py-2.5 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
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
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-600">Remember me</label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-md shadow-md-elegant-button focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Sign Up Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?
          <Link to="/signup" className="text-teal-600 hover:underline ml-2 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;