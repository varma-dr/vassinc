import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-600 flex flex-col items-center justify-center text-white">
      <header className="text-center px-6 md:px-12">
        <h1 className="text-6xl font-extrabold mb-4">VASS INC - Employee Management System</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Streamline recruitment and employee management effortlessly with cutting-edge technology and a user-friendly interface.
        </p>
        
        <div className="flex justify-center gap-6">
          <Link 
            to="/register" 
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link 
            to="/login" 
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
