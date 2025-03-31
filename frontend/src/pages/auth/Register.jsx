import React from "react";
import RegistrationForm from "../../components/auth/RegistrationForm";
import Logo from "/src/assets/VassInc logo.png";
 // Ensure this path is correct

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-400">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-lg text-white w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-4">
          <img src={Logo} alt="VASS INC Logo" className="mx-auto w-56 h-40 drop-shadow-lg" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-yellow-300 mb-2">
          Create Your Account
        </h2>

        {/* Registration Form */}
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;
