<<<<<<< Updated upstream
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import Logo from "../assets/VassInc logo.png";  

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
          <img src={Logo} alt="VASS INC Logo" className="mx-auto w-56 h-40 mb-2 drop-shadow-lg" />
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
=======
import React from 'react';
import VASSINCLogo from "../assets/VassInc_logo.png";
function RecruitmentWebsite() {
  return (
    <div className="font-sans leading-normal text-gray-800 bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src='./assets/VassInc_logo.png' alt="VASS INC Logo" className="h-10" />
          </a>
          <ul className="hidden md:flex space-x-6">
            <li><a href="#" className="text-gray-700 hover:text-blue-500 font-semibold">Home</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500 font-semibold">About Us</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500 font-semibold">Services</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500 font-semibold">For Candidates</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500 font-semibold">For Employers</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500 font-semibold">Contact</a></li>
          </ul>
          <div className="hidden md:flex space-x-4">
            <button className="bg-transparent hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 border border-gray-500 hover:border-transparent rounded">
              Login
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </div>
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-500 focus:outline-none focus:shadow-outline">
              &#9776;
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-hero-pattern bg-center bg-cover text-white py-32">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Partner in Finding the Perfect Talent</h1>
          <p className="text-lg md:text-xl mb-8">Connecting exceptional candidates with leading companies, driving mutual success.</p>
          <a href="#" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg">
            Join VASS Inc
          </a>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="text-blue-500 text-2xl mb-4">✨</div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Personalized Matching</h3>
              <p className="text-gray-600 text-sm">Our advanced algorithms ensure candidates are matched with roles that perfectly align with their skills and aspirations.</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="text-blue-500 text-2xl mb-4">💼</div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Extensive Network</h3>
              <p className="text-gray-600 text-sm">Access a vast network of top-tier talent and leading companies across various industries.</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="text-blue-500 text-2xl mb-4">🚀</div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Streamlined Process</h3>
              <p className="text-gray-600 text-sm">We simplify the recruitment journey, making it efficient and effective for both candidates and employers.</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="text-blue-500 text-2xl mb-4">🤝</div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Dedicated Support</h3>
              <p className="text-gray-600 text-sm">Receive personalized guidance and support from our experienced recruitment specialists at every step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Sections */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Unlock Your Potential as a Candidate</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Discover exciting career opportunities tailored to your skills.</li>
              <li>Get access to hidden job market vacancies.</li>
              <li>Receive expert career advice and interview preparation.</li>
            </ul>
            <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-block">
              Find Your Dream Job
            </a>
          </div>
          <div className="md:w-1/2">
            <img src="candidate-image.jpg" alt="Candidate Image" className="rounded-lg shadow-md" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
          <div className="md:w-1/2">
            <img src="recruiter-image.jpg" alt="Recruiter Image" className="rounded-lg shadow-md" />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Empowering Recruiters with the Right Tools</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Efficiently manage candidate pipelines and track progress.</li>
              <li>Access a rich database of qualified candidates.</li>
              <li>Collaborate seamlessly with hiring managers.</li>
            </ul>
            <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-block">
              Explore Recruiter Tools
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Top Talent for Your Business</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>быстрое и качественное закрытие вакансий.</li>
              <li>Access a diverse pool of skilled professionals.</li>
              <li>Reduce time-to-hire and recruitment costs.</li>
            </ul>
            <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-block">
              Hire Top Talent
            </a>
          </div>
          <div className="md:w-1/2">
            <img src="employer-image.jpg" alt="Employer Image" className="rounded-lg shadow-md" />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg shadow-md p-6">
              <span className="text-green-500 font-bold text-4xl">1,200+</span>
              <p className="text-gray-600 mt-2">Successful Placements</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6">
              <span className="text-green-500 font-bold text-4xl">500+</span>
              <p className="text-gray-600 mt-2">Total Clients/Companies</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6">
              <span className="text-green-500 font-bold text-4xl">98%</span>
              <p className="text-gray-600 mt-2">Candidate Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Clients Say</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-8 py-4">
              <div className="bg-white rounded-lg shadow-md p-6 w-80 flex-shrink-0">
                <p className="text-gray-700 mb-4 italic">"VASS INC truly understood our needs and found us the perfect candidate quickly. Their professionalism and dedication are commendable."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img src="avatar1.png" alt="Client Avatar" className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">John Smith</p>
                    <p className="text-gray-600 text-sm">Acme Corp</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 w-80 flex-shrink-0">
                <p className="text-gray-700 mb-4 italic">"As a candidate, VASS INC provided invaluable support and guidance throughout the entire process. I landed a fantastic role thanks to their efforts."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img src="avatar2.png" alt="Candidate Avatar" className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Jane Doe</p>
                    <p className="text-gray-600 text-sm">Tech Solutions Inc</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 w-80 flex-shrink-0">
                <p className="text-gray-700 mb-4 italic">"We've partnered with VASS INC for several key hires and have always been impressed with the quality of candidates they present."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img src="avatar3.png" alt="Client Avatar" className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Peter Jones</p>
                    <p className="text-gray-600 text-sm">Global Innovations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Trusted Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex justify-center items-center">
              <img src="partner-logo1.png" alt="Partner Logo 1" className="h-16 grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center">
              <img src="partner-logo2.png" alt="Partner Logo 2" className="h-16 grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center">
              <img src="partner-logo3.png" alt="Partner Logo 3" className="h-16 grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center">
              <img src="partner-logo4.png" alt="Partner Logo 4" className="h-16 grayscale hover:grayscale-0 transition duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">About VASS INC</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6">Our mission is to empower individuals and organizations to achieve their full potential through strategic and ethical recruitment solutions. We are committed to building lasting partnerships based on trust and mutual success.</p>
            <p className="text-gray-600 mb-6">We value integrity, collaboration, innovation, and a client-centric approach in everything we do.</p>
            <img src="company-image.jpg" alt="Company Image" className="rounded-lg shadow-md w-full" />
            <a href="/about" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-block mt-8">
              Learn More About Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">123 Main Street, Anytown, USA 12345</p>
            <p className="text-gray-300 mb-2">Email: info@vassinc.com</p>
            <p className="text-gray-300">Phone: (123) 456-7890</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="text-gray-300">
              <li className="mb-2"><a href="#" className="hover:text-blue-500">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500">Services</a></li>
              <li className="mb-2"><a href="#" className="hover:text">For Candidates</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500">For Employers</a></li>
              <li><a href="#" className="hover:text-blue-500">Contact</a></li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm">&copy; 2025 VASS INC. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RecruitmentWebsite;
>>>>>>> Stashed changes
