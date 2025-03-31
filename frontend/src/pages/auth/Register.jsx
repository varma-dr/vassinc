import React from "react";
import RegistrationForm from "../../components/auth/RegistrationForm";
import Logo from "../assets/VassInc logo.png";  

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-400">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-lg text-white w-full max-w-md relative">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-yellow-300 mb-2">
          Create Your Account
        </h2>

        <RegistrationForm logo={Logo} />
      </div>
    </div>
  );
};

export default Register;
